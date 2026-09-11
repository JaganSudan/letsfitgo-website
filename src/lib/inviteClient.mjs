const terminal = new Set([
  "invalid_invite",
  "invite_expired",
  "invite_revoked",
  "invite_exhausted",
  "not_supported",
  "challenge_full",
  "challenge_unavailable",
]);
export async function lookupInvite(token, config, fetcher = fetch) {
  if (!/^[a-z0-9]{6}$/i.test(token))
    return {
      isValid: false,
      code: "invalid_invite",
      retryable: false,
      message: "The invitation link is malformed.",
    };
  try {
    const response = await fetcher(
      `${config.api}/challenges/invite/${token.toUpperCase()}`,
      { method: "GET", cache: "no-store", referrerPolicy: "no-referrer" },
    );
    const data = await response.json();
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
export async function canCopyHandoff(config, fetcher = fetch) {
  try {
    const response = await fetcher(
      `${config.api}/challenges/invite-capabilities`,
      { cache: "no-store", referrerPolicy: "no-referrer" },
    );
    const data = await response.json();
    return (
      response.ok && data.contractVersion === 2 && data.websiteHandoff === true
    );
  } catch {
    return false;
  }
}
