# LFG invitation website — staging release in progress (2026-09-14)

Website baseline `2144e5162383f9f661a96753d28e0217675e6039`, isolated local branch
`codex/challenge-invite-e2e`. This branch is deployed to Vercel Preview; production
`main` remains unchanged. The mobile/backend implementation
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

Pages never join or auto-open the app on preload. Open-app and clipboard actions
require a click. The selected local fallback is user-chosen copy/paste or reopening
the original link after install, explicitly selected by the user on September 12;
it does not automatically cross an App Store
installation. Copy handoff checks the server's default-off `websiteHandoff`
capability on every click; failures preserve the reopen/paste-original-link path.
No provider or attribution SDK is installed. No unrestricted challenge code is
exposed by a token preview. Physical device proof remains required.

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
