"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchChallengeByInviteToken } from "@/lib/api";
import InviteAppOpen from "@/components/InviteAppOpen";
import { ChallengeInvite } from "@/types/challenge";
import { INVITE_CONFIG } from "@/lib/constants";
import InviteCard from "@/components/InviteCard";
import AppStoreButtons from "@/components/AppStoreButtons";
import LoadingState from "@/components/LoadingState";
export default function InvitePage() {
  const params = useParams();
  const token = typeof params.token === "string" ? params.token : "";
  const appName = INVITE_CONFIG.environment === "preview" ? "LFG Preview" : "LFG";
  const [invite, setInvite] = useState<ChallengeInvite | null>(null);
  const [attempt, setAttempt] = useState(0);
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
  return (
    <main className="min-h-screen break-words bg-blue-50 flex items-center justify-center p-4">
      <div className="min-w-0 max-w-2xl w-full space-y-6">
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
            This challenge is full or unavailable for new members.
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
        {validFormat && (
          <section className="bg-white rounded-2xl p-6 space-y-5 text-center">
            <InviteAppOpen key={token} token={token} appName={appName} joinable={Boolean(joinable)} />
            {joinable && invite.mode === "teams" && INVITE_CONFIG.environment === "production" && (
              <p className="text-sm text-gray-600">
                Already have LFG? Update to the latest version before opening this
                team invitation. Older versions cannot choose a team. After updating,
                return to the original message and tap the invitation again.
              </p>
            )}
            {joinable && (
              <div className="space-y-5 border-t pt-5">
                <h2 className="text-xl font-semibold">New to {appName}?</h2>
                <ol className="list-decimal space-y-3 pl-6 text-left">
                  <li>Install {appName} using the instructions below.</li>
                  <li>Open {appName} and create an account or sign in. Finish account setup.</li>
                  <li>Return to the message your friend sent and tap this invitation again.</li>
                  <li>{invite.mode === "teams"
                    ? `Review the challenge, choose your team and tap Join Team in ${appName}.`
                    : `Review the challenge and tap Join challenge in ${appName}.`}</li>
                </ol>
                <AppStoreButtons />
                <p className="text-sm text-gray-600">
                  Already signed in and finished setup? Tap the original invitation to review and join.
                </p>
              </div>
            )}
            {!joinable && !invite.retryable && (
              <p className="text-sm text-gray-600">
                This invitation cannot add new members. If you already joined,
                sign in to the same account in {appName}, then reopen this invitation.
              </p>
            )}
          </section>
        )}
        <footer className="text-center text-sm">
          <a href="/">About LFG</a> · <a href="/privacy">Privacy</a> ·{" "}
          <a href="/support">Support</a>
        </footer>
      </div>
    </main>
  );
}
