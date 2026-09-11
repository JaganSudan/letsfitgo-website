import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveInviteConfig,
  associationDocuments,
} from "../src/lib/inviteConfig.mjs";
import { lookupInvite, canCopyHandoff } from "../src/lib/inviteClient.mjs";
const previewEnv = {
  NEXT_PUBLIC_APP_ENV: "preview",
  NEXT_PUBLIC_API_URL: "https://lfg-staging.up.railway.app/api/v1",
  NEXT_PUBLIC_APP_SCHEME: "lfg-preview",
  NEXT_PUBLIC_SITE_URL: "https://preview-invite.letsfitgo.com",
};
const config = resolveInviteConfig(previewEnv);
test("build configuration rejects missing API and mixed environments", () => {
  for (const env of [
    {},
    { ...previewEnv, NEXT_PUBLIC_API_URL: "" },
    { ...previewEnv, NEXT_PUBLIC_APP_SCHEME: "lfg" },
    { ...previewEnv, NEXT_PUBLIC_SITE_URL: "https://letsfitgo.com" },
    {
      ...previewEnv,
      NEXT_PUBLIC_PLAY_STORE_URL:
        "https://play.google.com/store/apps/details?id=com.jagansudan.templfg",
    },
    {
      ...previewEnv,
      NEXT_PUBLIC_APP_STORE_URL:
        "https://apps.apple.com/nz/app/letsfitgo/id6754862826",
    },
  ])
    assert.throws(() => resolveInviteConfig(env));
  assert.equal(config.appStore, null);
  assert.equal(config.playStore, null);
});
test("preview reads exact staging API and cannot mutate membership", async () => {
  let calls = 0;
  const result = await lookupInvite("abc123", config, async (url, options) => {
    calls++;
    assert.equal(
      url,
      "https://lfg-staging.up.railway.app/api/v1/challenges/invite/ABC123",
    );
    assert.equal(options.method, "GET");
    assert.equal(options.referrerPolicy, "no-referrer");
    return {
      ok: true,
      json: async () => ({
        isValid: true,
        participantCount: 99,
        challengeId: "fake",
        status: "active",
      }),
    };
  });
  assert.equal(calls, 1);
  assert.equal(result.status, "active");
});
test("malformed token performs no request", async () => {
  const result = await lookupInvite("not-valid", config, () => {
    throw new Error("unexpected request");
  });
  assert.equal(result.retryable, false);
});
test("outages, HTML response, incomplete counts and rate limits are retryable", async () => {
  for (const response of [
    {
      ok: false,
      status: 503,
      json: async () => ({ code: "invite_unavailable" }),
    },
    { ok: false, status: 429, json: async () => ({}) },
    {
      ok: true,
      json: async () => {
        throw new Error("HTML");
      },
    },
    { ok: true, json: async () => ({ isValid: true, participantCount: null }) },
  ])
    assert.equal(
      (await lookupInvite("ABC123", config, async () => response)).retryable,
      true,
    );
});
test("terminal server outcomes stay distinct", async () => {
  for (const code of [
    "invite_expired",
    "invite_revoked",
    "invite_exhausted",
    "challenge_full",
    "challenge_unavailable",
    "not_supported",
  ]) {
    const result = await lookupInvite("ABC123", config, async () => ({
      ok: false,
      status: 409,
      json: async () => ({ code, message: "Outcome" }),
    }));
    assert.equal(result.code, code);
    assert.equal(result.retryable, false);
  }
});
test("remote handoff control fails closed when unavailable or disabled", async () => {
  assert.equal(
    await canCopyHandoff(config, async () => {
      throw new Error("offline");
    }),
    false,
  );
  assert.equal(
    await canCopyHandoff(config, async () => ({
      ok: true,
      json: async () => ({ contractVersion: 2, websiteHandoff: false }),
    })),
    false,
  );
  assert.equal(
    await canCopyHandoff(config, async () => ({
      ok: true,
      json: async () => ({ contractVersion: 2, websiteHandoff: true }),
    })),
    true,
  );
});
test("associations are off by default and require exact verified signing values", () => {
  assert.equal(associationDocuments(config, {}), null);
  assert.throws(() =>
    associationDocuments(config, { INVITE_ASSOCIATIONS_ENABLED: "true" }),
  );
  const docs = associationDocuments(config, {
    INVITE_ASSOCIATIONS_ENABLED: "true",
    INVITE_APPLE_APP_ID_PREFIX: "TEST123456",
    INVITE_ANDROID_CERT_SHA256: Array(32).fill("AB").join(":"),
  });
  assert.equal(
    docs.apple.applinks.details[0].appID,
    "TEST123456.com.jagansudan.templfg.preview",
  );
  assert.deepEqual(docs.apple.applinks.details[0].paths, ["/invite/*"]);
  assert.equal(
    docs.android[0].target.package_name,
    "com.jagansudan.templfg.preview",
  );
});
