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
export const HANDOFF_TTL_MS = 30000;

// Freshness and lifecycle are independent of navigation. Only the page's actual
// click may activate its native link; refreshing this gate never opens an app.
export function createWebsiteHandoff(config, {
  fetcher = fetch,
  now = Date.now,
  timeoutMs = 8000,
  onChange = (/** @type {{ status: string, expiresAt: number }} */ state) => { void state; },
} = {}) {
  let generation = 0;
  let snapshot = { status: "idle", expiresAt: 0 };
  const publish = (status, expiresAt = 0) => {
    snapshot = { status, expiresAt };
    onChange(snapshot);
  };
  return {
    getSnapshot: () => snapshot,
    canOpen: () => snapshot.status === "enabled" && now() < snapshot.expiresAt,
    invalidate() {
      generation++;
      publish("idle");
    },
    async refresh() {
      const request = ++generation;
      const startedAt = now();
      publish("loading");
      try {
        const { response, data } = await requestJson(
          `${config.api}/challenges/invite-capabilities`, fetcher, timeoutMs,
        );
        if (request !== generation) return;
        const expiresAt = startedAt + HANDOFF_TTL_MS;
        publish(response.ok && data?.contractVersion === 2 &&
          data.websiteHandoff === true && now() < expiresAt ? "enabled" : "blocked", expiresAt);
      } catch {
        if (request === generation) publish("blocked");
      }
    },
  };
}

// Synchronous guard: a stale tap can refresh permission for the next tap only.
export function guardAppOpen(event, handoff) {
  if (handoff.canOpen()) return true;
  event.preventDefault();
  void handoff.refresh();
  return false;
}
