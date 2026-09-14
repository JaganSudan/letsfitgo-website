const terminal = new Set([
  "invalid_invite",
  "invite_expired",
  "invite_revoked",
  "invite_exhausted",
  "not_supported",
  "challenge_full",
  "challenge_unavailable",
]);
async function requestJson(url, fetcher, timeoutMs) {
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([
      (async () => {
        const response = await fetcher(url, {
          method: "GET",
          cache: "no-store",
          referrerPolicy: "no-referrer",
          signal: controller.signal,
        });
        return { response, data: await response.json() };
      })(),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new Error("Invitation request timed out"));
        }, timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
export async function lookupInvite(
  token,
  config,
  fetcher = fetch,
  timeoutMs = 12000,
) {
  if (!/^[a-z0-9]{6}$/i.test(token))
    return {
      isValid: false,
      code: "invalid_invite",
      retryable: false,
      message: "The invitation link is malformed.",
    };
  try {
    const { response, data } = await requestJson(
      `${config.api}/challenges/invite/${token.toUpperCase()}`,
      fetcher,
      timeoutMs,
    );
    if (!response.ok) {
      const retryable =
        response.status === 429 ||
        response.status >= 500 ||
        !terminal.has(data.code);
      return {
        isValid: false,
        code: retryable ? "invite_unavailable" : data.code,
        retryable,
        message: retryable
          ? "Could not load the invitation. Please retry."
          : data.message,
      };
    }
    if (
      typeof data.isValid !== "boolean" ||
      (data.isValid &&
        (!Number.isInteger(data.participantCount) || !data.challengeId))
    )
      throw new Error("Incomplete invite response");
    return data;
  } catch {
    return {
      isValid: false,
      code: "invite_unavailable",
      retryable: true,
      message: "Could not load the invitation. Please retry.",
    };
  }
}
export async function canCopyHandoff(
  config,
  fetcher = fetch,
  timeoutMs = 8000,
) {
  try {
    const { response, data } = await requestJson(
      `${config.api}/challenges/invite-capabilities`,
      fetcher,
      timeoutMs,
    );
    return (
      response.ok && data.contractVersion === 2 && data.websiteHandoff === true
    );
  } catch {
    return false;
  }
}

export async function copyInviteHandoff(
  token,
  config,
  browser = {
    clipboard: globalThis.navigator?.clipboard,
    ClipboardItem: globalThis.ClipboardItem,
  },
  fetcher = fetch,
) {
  if (
    !/^[a-z0-9]{6}$/i.test(token) ||
    !browser.clipboard?.write ||
    !browser.ClipboardItem
  )
    return "unavailable";
  let enabled;
  const content = canCopyHandoff(config, fetcher).then((allowed) => {
    enabled = allowed;
    if (!allowed) throw new Error("Invitation handoff is paused");
    return new Blob([`${config.origin}/invite/${token.toUpperCase()}`], {
      type: "text/plain",
    });
  });
  // Handle content rejection even if the browser refuses the write immediately.
  void content.catch(() => {});
  try {
    // Invoke write in the click gesture; only the ClipboardItem's data is deferred.
    // Awaiting the capability fetch before writeText loses Safari's user activation.
    await browser.clipboard.write([
      new browser.ClipboardItem({ "text/plain": content }),
    ]);
    return "copied";
  } catch {
    return enabled === false ? "paused" : "unavailable";
  }
}
