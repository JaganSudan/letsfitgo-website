"use client";
import { useEffect, useMemo, useState } from "react";
import { createWebsiteHandoff, guardAppOpen } from "@/lib/inviteClient.mjs";
import { APP_SCHEME, INVITE_CONFIG } from "@/lib/constants";

export default function InviteAppOpen({ token, appName, joinable }: {
  token: string;
  appName: string;
  joinable: boolean;
}) {
  const [permission, setPermission] = useState({ status: "idle", expiresAt: 0 });
  const handoff = useMemo(() => createWebsiteHandoff(INVITE_CONFIG, {
    onChange: setPermission,
  }), []);
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === "visible") void handoff.refresh();
    };
    const invalidate = () => handoff.invalidate();
    const visibility = () => document.visibilityState === "visible" ? refresh() : invalidate();
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    window.addEventListener("pagehide", invalidate);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
      window.removeEventListener("pagehide", invalidate);
      document.removeEventListener("visibilitychange", visibility);
      invalidate();
    };
  }, [handoff]);
  useEffect(() => {
    if (permission.status !== "enabled") return;
    const timer = setTimeout(() => handoff.invalidate(), Math.max(0, permission.expiresAt - Date.now()));
    return () => clearTimeout(timer);
  }, [handoff, permission]);
  const loading = permission.status === "loading";
  return (
    <div className="space-y-3">
      {permission.status === "enabled" ? (
        <a
          className="block rounded-xl bg-blue-600 text-white p-3 font-semibold"
          href={`${APP_SCHEME}://invite/${token.toUpperCase()}`}
          onClick={(event) => { guardAppOpen(event, handoff); }}
        >
          {joinable ? `Open ${appName} to review and join` : `Already a member? Open ${appName}`}
        </a>
      ) : (
        <>
          <p role="status" className="text-sm text-gray-600">
            {loading ? "Checking app opening…" : "Opening from this page is currently unavailable. You can return to the original message and tap your invitation again."}
          </p>
          <button
            className="rounded-xl border border-blue-600 px-4 py-3 text-blue-700 disabled:opacity-50"
            onClick={() => { void handoff.refresh(); }}
            disabled={loading}
          >Check app opening</button>
        </>
      )}
      <p className="text-sm text-gray-600">
        If your messaging app keeps this page in its browser, use its menu to open
        the page in Safari or your default browser, then tap Open {appName}.
      </p>
    </div>
  );
}
