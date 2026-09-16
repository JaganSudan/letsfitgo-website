# LFG invitation website — account-first Preview release (2026-09-16)

The implemented journey is install → ordinary account creation/sign-in and onboarding
in LFG → return to the original message → review and explicitly Join challenge. Already
signed-in/onboarded recipients go directly to review. There is no web signup or consent
carried through setup. The app gives brief guidance for early taps and requires a fresh
post-setup tap. The authoritative execution record is
`/private/tmp/lfg-challenge-invite-e2e/docs/roadmap/challenge-invite-account-first-plan.md`.
The current exact review package is `/private/tmp/lfg-invite-account-first-review/README.md`.
This candidate is published to Preview; physical acceptance remains pending. See the
September 16 publication record below.

Website baseline `2144e5162383f9f661a96753d28e0217675e6039`, isolated local branch
`codex/challenge-invite-e2e`. The September 14 release of this branch is deployed to Vercel Preview.
The September 15/16 account-first changes are now published to Preview; production `main` remains unchanged. The mobile/backend implementation
and full release gate record are in the LFG repository's
`docs/roadmap/challenge-invite-end-to-end-plan.md`.

The candidate now requires **all four** matching public configuration values at
build time; an empty API base or a crossed app environment fails the build:

```
NEXT_PUBLIC_APP_ENV=preview
NEXT_PUBLIC_API_URL=https://lfg-staging.up.railway.app/api/v1
NEXT_PUBLIC_APP_SCHEME=lfg-preview
NEXT_PUBLIC_SITE_URL=https://preview-invite.letsfitgo.com
```

`preview-invite.letsfitgo.com` is bound to this branch in the existing Vercel project
`letsfitgo-website`. Its DNS CNAME and hostname-specific public access exception are
saved and anonymous HTTPS access is verified. The user authorized this staging
release after the earlier deferral. `dev-invite.letsfitgo.com` remains unconfigured.
Production accepts only
the existing letsfitgo.com, www.letsfitgo.com and go.letsfitgo.com origins and
`https://api.letsfitgo.com/api/v1` with `lfg`. Development uses its own `lfg-dev`
scheme and `dev-invite.letsfitgo.com` origin with the staging API.

Install links are explicit: `NEXT_PUBLIC_APP_STORE_URL` and
`NEXT_PUBLIC_PLAY_STORE_URL`. Preview without a public TestFlight URL uses the internal-tester instructions;
production store targets cannot leak into preview. Production URLs retain iOS
`6754862826` and Android `com.jagansudan.templfg`; preview supports its explicit TestFlight
invitation or enrolled internal testers, and Play package `com.jagansudan.templfg.preview`. LFG Preview 1.1.0 (8) is available to the existing internal LFG TestFlight group;
signed iOS association proof passes, while physical beta installation remains pending.

Pages never join or auto-open on preload. The recipient installs LFG, opens it normally,
creates an account or signs in and finishes onboarding. Normal setup lands normally,
with no challenge join. They return to the original message and tap the invitation,
review it in LFG and explicitly join to reach that exact challenge.
The website removes copy/paste controls and shows install guidance only for joinable
invitations; unavailable invitations retain existing-member opening. There is no
website signup or deferred-link provider.

In this candidate, v2 `websiteHandoff` gates the explicit **Open app** action.
Load capabilities on entry, focus/pageshow and visible resume (8-second timeout).
Enabled results expire at most 30 seconds after request start; hide/pagehide
invalidates them and late responses cannot restore stale permission. A fresh link
activates synchronously in the user's click. Stale taps prevent navigation and
refresh for the next tap only; nothing auto-launches after the request. False,
missing, old-contract and failed responses keep native opening unavailable. This
does not control OS-delivered links or the separate native automatic-join policy.
Older released websites use the same field for clipboard gating; the API is unchanged.
No unrestricted challenge code is exposed by public preview. Browser-specific native
opening and real installation remain physical-device gates.

The `.well-known/apple-app-site-association` and `.well-known/assetlinks.json` routes
return 404 until `INVITE_ASSOCIATIONS_ENABLED=true` and the corresponding
`INVITE_APPLE_APP_ID_PREFIX` or `INVITE_ANDROID_CERT_SHA256` has a verified value.
Platforms activate independently; an absent platform identity keeps its route at 404.
These public signing values must be for the selected environment and the Android
**Play app-signing** certificate. Never substitute the upload key or a made-up ID.
Association responses target only `/invite/*`. Publishing them requires separate
authorization; they can affect installed clients immediately.

Invite routes send `no-referrer`, `no-store`, and `noindex` headers. Application code
does not log URLs or tokens. Hosting/CDN access-log retention and redaction cannot be
verified locally and remain an activation gate. Vercel is indicated by `vercel.json`;
the actual project and account are verified for the staging release. The verified
public website release is `c50a7bd2f864a19af571182a6d88ca0c97e51f9f`; documentation-only
follow-ups may advance deployment revisions without changing application behavior.

Run `node --test test/invite.test.mjs`, `npm run lint`, `npx --no-install tsc --noEmit`,
and a configured `npm run build`. Never use a deploy command as a build check.

## September 14 local review

The review adds bounded preview/capability requests (12/8 seconds, including stalled
response bodies) and keeps clipboard writes inside the user's click gesture. The
clipboard item resolves its text only after the fresh capability check permits it;
disabled/unavailable controls supply no clipboard data. Unsupported or denied
clipboard access retains the visible reopen/paste-original-message fallback.

This follows the [WebKit clipboard requirement](https://webkit.org/blog/10855/async-clipboard-api/)
and its [deferred ClipboardItem guidance](https://bugs.webkit.org/show_bug.cgi?id=222262).
Local injected-browser tests cover call timing, delayed capabilities and denied
handoff; they do not prove physical Safari/Android installation behavior.

Validation: 10/10 tests and the Next production build pass. No deployment or
hosted configuration changed; staging website setup remains deferred.

## September 14 approved staging preparation

The user authorized the full staging website and Preview/TestFlight rehearsal.
The existing Vercel project is `letsfitgo-website` in `jagans-projects-40170dc0`,
connected to `JaganSudan/letsfitgo-website`. Use only Preview branch settings.
The existing LFG Preview app has an internal tester group and no public join link.
Without an explicit public TestFlight URL, the Preview website provides Apple's
TestFlight download button and instructions to install **LFG Preview** from the
already-enrolled tester's app. This does not grant new tester access. The workflow
follows [Apple's internal tester instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/add-internal-testers).
iOS associations may activate with verified provisioning proof while the Android
route remains 404 pending its app-signing certificate. Physical proof is pending.

The initial staging publication passes 11 tests and the Next build. Vercel deployment
`EbgjYFbWKdU1mahnJe6T8AzqLPq2` is ready. Anonymous HTTPS returns 200 with
`no-referrer`, `no-store` and `noindex, nofollow`; browser inspection confirms malformed
link recovery and the Preview-specific TestFlight instructions. This is not yet a
full valid-invite acceptance pass: the matching backend migration/deployment, signed
association document and physical device tests are still pending.

Signed iOS build `a7f6462b-6fd0-4c3b-8f58-73438caa5fab`, 1.1.0 (8), now
confirms prefix `X34GTT97WN` and only `applinks:preview-invite.letsfitgo.com`.
The user-approved public hostname exception is saved. Publishing the verified
Apple prefix and association flag remains paused after automatic approval review
requested separately explicit hosted-configuration authorization.


## September 14 staging release completed; phone acceptance pending

The owner gave the exact remaining hosted-release approval. Preview-only Apple
prefix `X34GTT97WN` and `INVITE_ASSOCIATIONS_ENABLED=true` are saved. Deployment
`7fBH2iAFQ5ejLSSmZgeqovBgHtpy`, source `c50a7bd2f864a19af571182a6d88ca0c97e51f9f`,
is ready and bound to `preview-invite.letsfitgo.com`. Both direct AASA and Apple's
association CDN return 200 with only the signed `.preview` application and `/invite/*`.
Android remains 404 pending its verified signing certificate. The earlier automatic
approval block is resolved; no production settings or purchases changed.

The matching staging backend/migration and all three invite capabilities are live.
The browser displays disposable INVITE TEST A, its correct Preview scheme link and
TestFlight/reopen guidance. Explicit copy shows success after its capability check;
database verification confirms viewing/copying consumed no invitation use. Public
preview CORS and challenge-code redaction pass. Backend hosted acceptance passes
28 checks including atomic final-use/capacity races and denied client RPC permissions.

LFG Preview 1.1.0 (8), EAS build `a7f6462b-6fd0-4c3b-8f58-73438caa5fab`, is Testing
in the existing internal LFG group of four testers; build-specific test notes are
saved. The website's Get TestFlight path is for those enrolled testers, with no
public join URL or new access grant. Physical Safari copy, Universal Links,
installation/reopen, fresh signup and final UI/destination acceptance remain pending.
Hosting/CDN raw-URL logging/retention is also unverified. No end-to-end device pass
is claimed from desktop browser or signing proof.

## September 15 local reopen-flow review

The new UX builds on `87fd1abda72a605b2e7f99683c4b2771093a06bb`; no new deployment,
hosted settings, associations or store targets were changed. The historical
September 14 sections above remain evidence of that earlier release, including its
clipboard workflow. The app worktree's `challenge-invite-reopen-flow-plan.md` and
`challenge-invite-phone-test.md` track the revised candidate and pending acceptance.

For local browser regression, start a configured production build on
`http://127.0.0.1:3107`, then run `node --test test/invite-browser.test.cjs` with
Playwright available through the local runtime's `NODE_PATH`. The test refuses a
non-loopback base, intercepts every staging API request with fake fixtures and blocks
other external requests. It checks the real page at 320px/large text, install/reopen
copy, trusted click gating, unavailable/disabled states and retry. It deliberately
prevents native launching; browser tests cannot prove app installation or link delivery.

## September 16 account-first amendment

Amended the existing dirty candidate based on
`87fd1abda72a605b2e7f99683c4b2771093a06bb`. The page now has four ordered steps:
install, ordinary account setup, return to message, review/Join challenge. Unavailable
invitations keep member recovery without promising installation will enable a new join.
Preview still uses the existing tester invitation: downloading TestFlight alone does
not install LFG Preview or enroll a tester. Store targets/associations are unchanged.

The existing `InviteAppOpen` and `inviteClient` capability/gesture implementation is
preserved. Refresh never launches the app. Browser tests assert the exact instruction
order and retain the original expiry/resume/terminal cases. Validation: 11 unit tests,
configured build, TypeScript, lint and 5 loopback mocked Chromium checks pass. Two
existing image lint warnings and browser-data notices remain. The 320px screenshot
was visually reviewed; 200% text overflow check passes. Real iOS/Android, native opening,
email delivery and loaded-update proof remain separate gates.

Review label: `account-first-local-2026-09-16-r1`. The new review package contains patches
against this HEAD, amendment-only patches against the supplied dirty candidate, per-file
hashes, source IDs, logs and screenshot. The prior `/private/tmp/lfg-invite-reopen-review/`
package remains historical. No push, publication, hosted flag change, fixture mutation,
native submission or production action is authorized/performed by this local step.

## September 16 approved Preview publication

The owner explicitly requested the Preview push for phone testing. Implementation
`7082d3a23b566a891b7445612084389a4803c48a` is published on branch `codex/challenge-invite-e2e`.
Vercel Preview deployment `CLCv63pu1fxwHFaz65a1m2spJT3g` succeeded;
`https://preview-invite.letsfitgo.com` serves the new account-first JavaScript and
Preview-only targets. HTTP privacy headers, staging health/capabilities/CORS and
Preview-only Apple association passed public read-only verification. Documentation-only
follow-ups may advance the deployment revision without changing website behavior.

Matching app `2324a7d9c02f2bb554be457c327d60d51398a8b2` is on Preview OTA group
`f0e567de-8eee-4689-bffb-b2293013d4c2`, runtime `1.1.0-preview`, compatible with existing
LFG Preview 1.1.0 (8). No new binary, schema, hosted flag/association setting, fixture
mutation or production change was performed. Physical acceptance and fresh email
delivery remain pending. The app repository's September 16 account-first Preview
release record and phone checklist contain the exact publication/testing evidence.
