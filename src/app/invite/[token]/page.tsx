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
  const appName =
    INVITE_CONFIG.environment === "preview" ? "LFG Preview" : "LFG";
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
    <main className="min-h-screen break-words bg-slate-50 flex items-start justify-center px-4 py-8 sm:py-12">
      <div className="min-w-0 max-w-lg w-full space-y-6">
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
        {!invite.isValid && (
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
            {joinable && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Get {appName} to join</h2>
                  <p className="text-gray-600">
                    Download the app to join your friends.
                  </p>
                </div>
                <AppStoreButtons />
                <ol className="list-decimal space-y-2 pl-6 text-left text-sm text-gray-600">
                  <li>Install {appName} using the download button above.</li>
                  <li>
                    Open {appName} and create an account or sign in. Finish
                    account setup.
                  </li>
                  <li>
                    Return to the message your friend sent and tap this
                    invitation again.
                  </li>
                  <li>
                    {invite.mode === "teams"
                      ? `Review the challenge, choose your team and tap Join Team in ${appName}.`
                      : `Review the challenge and tap Join challenge in ${appName}.`}
                  </li>
                </ol>
              </div>
            )}
            <div className={joinable ? "border-t pt-5 space-y-3" : "space-y-3"}>
              {joinable && (
                <h2 className="text-sm font-semibold">
                  Already have {appName}?
                </h2>
              )}
              <InviteAppOpen
                key={token}
                token={token}
                appName={appName}
                joinable={Boolean(joinable)}
              />
              {joinable &&
                invite.mode === "teams" &&
                INVITE_CONFIG.environment === "production" && (
                  <p className="text-sm text-gray-600">
                    Already have LFG? Update to the latest version before
                    opening this team invitation. Older versions cannot choose a
                    team. After updating, return to the original message and tap
                    the invitation again.
                  </p>
                )}
            </div>
            {!joinable && !invite.retryable && (
              <p className="text-sm text-gray-600">
                This invitation cannot add new members. If you already joined,
                sign in to the same account in {appName}, then reopen this
                invitation.
              </p>
            )}
          </section>
        )}
        {invite.isValid && (
          <details className="rounded-2xl border border-gray-200 bg-white p-5">
            <summary className="cursor-pointer text-sm text-gray-600">
              Challenge details
              <span className="mt-1 block text-base font-semibold text-gray-900">
                {invite.challengeName}
              </span>
            </summary>
            <div className="mt-4">
              <InviteCard invite={invite} />
            </div>
          </details>
        )}
        <footer className="text-center text-sm">
          <a href="/">About LFG</a> · <a href="/privacy">Privacy</a> ·{" "}
          <a href="/support">Support</a>
        </footer>
      </div>
    </main>
  );
}
