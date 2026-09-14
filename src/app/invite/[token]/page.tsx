"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchChallengeByInviteToken } from "@/lib/api";
import { copyInviteHandoff } from "@/lib/inviteClient.mjs";
import { ChallengeInvite } from "@/types/challenge";
import { APP_SCHEME, INVITE_CONFIG } from "@/lib/constants";
import InviteCard from "@/components/InviteCard";
import AppStoreButtons from "@/components/AppStoreButtons";
import LoadingState from "@/components/LoadingState";
export default function InvitePage() {
  const params = useParams();
  const token = typeof params.token === "string" ? params.token : "";
  const appName = INVITE_CONFIG.environment === "preview" ? "LFG Preview" : "LFG";
  const [invite, setInvite] = useState<ChallengeInvite | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let current = true;
    setInvite(null);
    void fetchChallengeByInviteToken(token).then((value) => {
      if (current) setInvite(value);
    });
    return () => {
      current = false;
    };
  }, [token, attempt]);
  if (!invite) return <LoadingState />;
  const validFormat = /^[a-z0-9]{6}$/i.test(token);
  const joinable =
    invite.isValid &&
    (!invite.joinAvailability || invite.joinAvailability === "available");
  const copy = async () => {
    const outcome = await copyInviteHandoff(token, INVITE_CONFIG);
    if (outcome === "paused") {
      setMessage(
        "Copy handoff is paused. Install LFG, then reopen this original link or paste it into Join a challenge.",
      );
      return;
    }
    if (outcome === "copied") {
      setMessage(
        "Invitation copied. Install LFG, choose Join a challenge, then paste the link and confirm. Your clipboard may be replaced by anything else you copy.",
      );
    } else {
      setMessage(
        "Copy was unavailable. After installing, reopen this original message and tap its link.",
      );
    }
  };
  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        <header className="text-center space-y-3">
          <Image
            src="/lfgappicongradient.png"
            alt="LFG"
            width={64}
            height={64}
            className="rounded-xl mx-auto"
          />
          <h1 className="text-3xl font-bold">
            {invite.isValid
              ? "Your challenge invitation"
              : invite.retryable
                ? "Invitation temporarily unavailable"
                : "This invitation is unavailable"}
          </h1>
        </header>
        {invite.isValid ? (
          <InviteCard invite={invite} />
        ) : (
          <p role="status" className="text-center">
            {invite.message || "Ask the sender for a new invitation."}
          </p>
        )}
        {!joinable && invite.isValid && (
          <p role="status">
            {invite.mode === "teams"
              ? "Teams require a direct invitation in LFG so you can choose a team."
              : "This challenge is full or unavailable for new members."}
          </p>
        )}
        {invite.retryable && (
          <button
            className="block mx-auto text-blue-700 underline"
            onClick={() => setAttempt((value) => value + 1)}
          >
            Retry invitation
          </button>
        )}
        <section className="bg-white rounded-2xl p-8 space-y-5 text-center">
          {validFormat && (
            <a
              className="block rounded-xl bg-blue-600 text-white p-3 font-semibold"
              href={`${APP_SCHEME}://invite/${token.toUpperCase()}`}
            >
              {joinable
                ? `Open ${appName} to review and join`
                : `Already a member? Open ${appName}`}
            </a>
          )}
          <h2 className="text-xl font-semibold">Installing {appName}?</h2>
          <p>
            After installing, reopen this original link. Or choose Join a
            challenge on the welcome screen and paste the full link. Signing up
            alone does not transfer an invitation.
          </p>
          {validFormat && (
            <button className="text-blue-700 underline" onClick={copy}>
              Copy invitation before installing
            </button>
          )}
          {message && <p role="status">{message}</p>}
          <AppStoreButtons />
          <p className="text-sm text-gray-600">
            No automatic clipboard reads. No cross-device transfer. An expired
            or revoked invitation cannot add a new member.
          </p>
        </section>
        <footer className="text-center text-sm">
          <a href="/">About LFG</a> · <a href="/privacy">Privacy</a> ·{" "}
          <a href="/support">Support</a>
        </footer>
      </div>
    </main>
  );
}
