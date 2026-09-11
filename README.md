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
return 404 until `INVITE_ASSOCIATIONS_ENABLED=true` and both
`INVITE_APPLE_APP_ID_PREFIX` and `INVITE_ANDROID_CERT_SHA256` have verified values.
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
