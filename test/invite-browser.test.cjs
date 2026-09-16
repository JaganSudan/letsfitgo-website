// Local-only browser checks. Requires Playwright supplied by the local runtime.
// Run against a configured Next build on loopback; all non-local traffic is mocked/blocked.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.INVITE_TEST_BASE_URL || 'http://127.0.0.1:3107';
assert.equal(new URL(base).hostname, '127.0.0.1');
let browser;
before(async () => { browser = await chromium.launch({ headless: true }); });
after(async () => { await browser?.close(); });
const preview = {
  isValid: true, challengeId: 'fake-challenge-A', challengeName: 'Morning miles with friends',
  description: 'A friendly walking challenge.', status: 'upcoming', mode: 'ffa',
  startDate: '2026-10-01', endDate: '2026-10-31', participantCount: 3, maxParticipants: 100,
  joinAvailability: 'available',
};
async function fixture({ result = preview, enabled = true, width = 390 } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 844 } });
  const calls = [];
  let capabilityEnabled = enabled;
  let previewResult = result;
  await context.route('**/*', async route => {
    const request = route.request(); const url = new URL(request.url());
    if (url.origin === base) return route.continue();
    assert.equal(request.method(), 'GET', 'browser must never mutate membership');
    if (url.origin === 'https://lfg-staging.up.railway.app') {
      calls.push(url.pathname);
      const data = url.pathname.endsWith('/invite-capabilities')
        ? { contractVersion: 2, websiteHandoff: capabilityEnabled }
        : previewResult;
      return route.fulfill({ json: data });
    }
    return route.abort(); // No external traffic, including real staging or production.
  });
  const page = await context.newPage();
  await page.clock.install();
  await page.goto(`${base}/invite/ABC123`);
  await page.getByRole('heading', { name: 'Your challenge invitation' }).or(page.getByRole('heading', { name: /unavailable/ })).waitFor();
  return { page, calls, context, setEnabled: value => { capabilityEnabled = value; }, setPreview: value => { previewResult = value; } };
}
test('small-screen actual page shows install/account-setup/reopen/join guidance without URL or clipboard controls', async () => {
  const f = await fixture({ width: 320 });
  try {
    await f.page.getByRole('link', { name: 'Open LFG Preview to review and join' }).waitFor();
    assert.match(await f.page.locator('main').innerText(), /Return to the message your friend sent/);
    assert.deepEqual(await f.page.locator('ol li').allTextContents(), [
      'Install LFG Preview using the instructions below.',
      'Open LFG Preview and create an account or sign in. Finish account setup.',
      'Return to the message your friend sent and tap this invitation again.',
      'Review the challenge and tap Join challenge in LFG Preview.',
    ]);
    assert.doesNotMatch(await f.page.locator('main').innerText(), /Choose to join, then|after account setup, this challenge opens/i);
    assert.equal(await f.page.locator('input').count(), 0);
    assert.doesNotMatch(await f.page.locator('main').innerText(), /paste|clipboard|Copy invitation/i);
    assert.equal(await f.page.getByRole('link', { name: 'Open LFG Preview to review and join' }).getAttribute('href'), 'lfg-preview://invite/ABC123');
    if (process.env.INVITE_TEST_SCREENSHOT) await f.page.screenshot({ path: process.env.INVITE_TEST_SCREENSHOT, fullPage: true });
    await f.page.addStyleTag({ content: 'html { font-size: 200%; }' });
    assert.equal(await f.page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.ok(f.calls.every(path => !path.includes('join-by-invite')));
  } finally { await f.context.close(); }
});
test('fresh Open-app click remains in the gesture; expired click blocks and only refreshes the next tap', async () => {
  const f = await fixture();
  try {
    const link = f.page.getByRole('link', { name: 'Open LFG Preview to review and join' });
    await link.waitFor();
    await f.page.evaluate(() => {
      window.openAttempts = [];
      document.addEventListener('click', event => {
        if (event.target.closest('a[href^="lfg-preview:"]')) {
          window.openAttempts.push({ blocked: event.defaultPrevented, trusted: event.isTrusted });
          event.preventDefault(); // The test observes the gesture; never launch an installed app.
        }
      });
    });
    await link.click();
    assert.deepEqual(await f.page.evaluate(() => window.openAttempts), [{ blocked: false, trusted: true }]);
    await f.page.clock.setSystemTime(new Date(Date.now() + 31000));
    await link.click();
    assert.deepEqual(await f.page.evaluate(() => window.openAttempts), [{ blocked: false, trusted: true }, { blocked: true, trusted: true }]);
    await link.waitFor();
    assert.equal(await f.page.evaluate(() => window.openAttempts.length), 2);
  } finally { await f.context.close(); }
});
test('disabled capability and hide/resume remove native opening until a new enabled check', async () => {
  const f = await fixture({ enabled: false });
  try {
    await f.page.getByRole('button', { name: 'Check app opening' }).waitFor();
    await f.page.getByText('Opening from this page is currently unavailable.', { exact: false }).waitFor();
    assert.equal(await f.page.locator('a[href^="lfg-preview:"]').count(), 0);
    f.setEnabled(true);
    await f.page.getByRole('button', { name: 'Check app opening' }).click();
    await f.page.locator('a[href^="lfg-preview:"]').waitFor();
    await f.page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide')));
    await f.page.locator('a[href^="lfg-preview:"]').waitFor({ state: 'detached' });
    f.setEnabled(false);
    await f.page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow')));
    await f.page.getByText('Opening from this page is currently unavailable.', { exact: false }).waitFor();
    assert.equal(await f.page.locator('a[href^="lfg-preview:"]').count(), 0);
  } finally { await f.context.close(); }
});
test('unavailable invitation retains member recovery without an installation invitation', async () => {
  const f = await fixture({ result: { ...preview, joinAvailability: 'challenge_unavailable', status: 'completed' } });
  try {
    await f.page.getByRole('link', { name: 'Already a member? Open LFG Preview' }).waitFor();
    assert.equal(await f.page.getByRole('link', { name: 'Get TestFlight' }).count(), 0);
    assert.match(await f.page.locator('main').innerText(), /cannot add new members/);
  } finally { await f.context.close(); }
});
test('preview failure offers retry and recovers the real page without a join', async () => {
  const f = await fixture({ result: { isValid: false, retryable: true, message: 'Please retry.' } });
  try {
    await f.page.getByRole('button', { name: 'Retry invitation' }).waitFor();
    assert.equal(await f.page.getByRole('link', { name: 'Get TestFlight' }).count(), 0);
    f.setPreview(preview);
    await f.page.getByRole('button', { name: 'Retry invitation' }).click();
    await f.page.getByRole('heading', { name: 'Your challenge invitation' }).waitFor();
    await f.page.getByRole('link', { name: 'Get TestFlight' }).waitFor();
  } finally { await f.context.close(); }
});

test('team challenge instructions lead to the shared in-app team picker', async () => {
  const f = await fixture({ result: { ...preview, mode: 'teams' } });
  try {
    await f.page.getByRole('link', { name: 'Open LFG Preview to review and join' }).waitFor();
    assert.match((await f.page.locator('ol li').allTextContents())[3], /choose your team and tap Join Team/);
    assert.ok(f.calls.every(path => !path.includes('join-by-invite')));
  } finally { await f.context.close(); }
});
