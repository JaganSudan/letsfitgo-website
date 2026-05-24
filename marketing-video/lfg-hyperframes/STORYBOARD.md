# LFG Hyperframes Storyboard

## Creative Direction

Use real LFG app screenshots where possible, then fill the challenge flow with clean UI mockups that match the app's white cards, black typography, blue scoring, and yellow rank accents. Keep the layout product-first and legible at social feed sizes.

## Timeline

| Time | Scene | Motion | Assets |
| --- | --- | --- | --- |
| 0-4s | Hook | Logo snaps in, phone screens glide in, activity chips pulse | `assets/lfg-logo.png`, `assets/challenge-phone.png`, `assets/challenge-leaderboard.png` |
| 4-8s | Challenge setup | Challenge setup card steps through create, invite, active states | CSS UI mockups |
| 8-12s | Friend notifications | Notification cards cascade in from different sides | `assets/friend-notifications.png`, `assets/lfg-app-icon.png` |
| 12-16s | Leaderboard | Bars grow, ranks shift, score deltas pop | CSS leaderboard UI, `assets/challenge-leaderboard.png` |
| 16-20s | CTA | App icon and store badges settle into final lockup | `assets/app-store.svg`, `assets/google-play.svg`, `assets/lfg-app-icon.png` |

## Validation Notes

- The composition root is `main`; the project metadata id is `lfg-social-fitness`.
- All top-level timed visible scenes use `class="clip"`, `data-start`, `data-duration`, and `data-track-index`.
- Animation is seek-driven through `window.__timelines["lfg-social-fitness"]` and `window.__hf` so Hyperframes can render deterministic frames without runtime network fetches.
