import { ChallengeInvite } from "@/types/challenge";
import { INVITE_CONFIG } from "./constants";
import { lookupInvite } from "./inviteClient.mjs";
export async function fetchChallengeByInviteToken(
  token: string,
): Promise<ChallengeInvite> {
  return lookupInvite(token, INVITE_CONFIG);
}
