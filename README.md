# LFG invitation website — local candidate (2026-09-12)

Website baseline `2144e5162383f9f661a96753d28e0217675e6039`, isolated local branch
`codex/challenge-invite-e2e`. Nothing is deployed. The mobile/backend implementation
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

`preview-invite.letsfitgo.com` and `dev-invite.letsfitgo.com` are proposed, exact local
candidate hostnames. DNS, hosting ownership and deployment project require operator
confirmation. The user deferred staging website setup on September 12; these
nonproduction mappings remain inactive local candidates. No DNS or hosted
configuration has changed. Production accepts only
the existing letsfitgo.com, www.letsfitgo.com and go.letsfitgo.com origins and
`https://api.letsfitgo.com/api/v1` with `lfg`. Development uses its own `lfg-dev`
scheme and `dev-invite.letsfitgo.com` origin with the staging API.

Install links are explicit: `NEXT_PUBLIC_APP_STORE_URL` and
`NEXT_PUBLIC_PLAY_STORE_URL`. Missing preview values display an unavailable message;
production store targets cannot leak into preview. Production URLs retain iOS
`6754862826` and Android `com.jagansudan.templfg`; preview requires its TestFlight
invitation and Play package `com.jagansudan.templfg.preview`. Actual beta availability
and signing identities have not been verified.

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
the actual project, deployment SHA, credentials and operator are unverified.

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
