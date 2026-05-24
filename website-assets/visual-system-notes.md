# Website Visual System Notes

Status: Active  
Last Verified: 2026-05-22  
Primary Environment: External marketing website repo + LFG Expo mobile app context

## Brand Anchors

Use the current mobile app as the source for product truth, not as a strict
pixel-perfect website design system.

Important recognizable motifs:

- LFG brand mark/logo from `ui/assets/`.
- Clean black and white product UI.
- Challenge cards and challenge setup controls.
- Friend avatars, invite states, and selected-user rows.
- Fitness score points.
- Leaderboards, podiums, rank numbers, and current-user highlights.
- Streak badges.
- Team colors and team score bars.
- Notification bubbles and recent activity rows.
- Title pills such as `Rookie`, `Foot Soldier`, and `GOAT`.

## Color and Style Direction

The mobile app currently uses restrained product UI with black/white surfaces,
soft gray backgrounds, and selective accents.

Suggested website asset palette:

- Base: white, near-black, soft gray.
- Primary accent: black for buttons, outlines, selected states, and strong UI.
- Team accents:
  - Slot 1: blue.
  - Slot 2: gold.
  - Slot 3: black.
  - Slot 4: silver/gray.
- Functional accents:
  - Green for success, join states, and positive progress.
  - Gold/blue for rank and podium emphasis.

Keep gradients controlled and functional. Avoid making the entire section read
as a single-color gradient theme.

## Format Recommendations

Primary:

- SVG illustration components.
- React/HTML/CSS coded UI mockups.
- Lightweight CSS or JavaScript animation.

Secondary:

- PNG/WebP exports for platforms that need static images.
- Open Graph/social preview composites.
- App-store style promotional artwork.

Use Rive only if the website needs a polished interactive animation that will
be reused across pages or campaigns. For the first version of the "How it
works" section, coded components are simpler and easier to maintain.

## Asset Component Rules

Each coded asset should:

- Have a stable exported name matching the asset brief.
- Work in light mode.
- Scale down to mobile without text overlap.
- Use short labels only; long explanatory copy should stay outside the visual.
- Use product-accurate labels: `Create Challenge`, `Team Challenge`,
  `Add Workout`, `Send Invite`, `+115 pts`, `Leaderboard`, `Rookie`.
- Avoid hardcoding real user names unless they are clearly placeholders.

## Motion Guidance

Use subtle motion where it explains cause and effect:

- `log-workout`: workout card submits, points badge counts up.
- `leaderboard`: row moves up one rank or score bar fills.
- `momentum`: notification bubbles appear in sequence.
- `invite-friends`: selected avatars join an invite stack.

Do not make every card animate continuously. The section should feel clear, not
busy.

## Accuracy Constraints

Keep these product details accurate:

- Workouts can be logged manually.
- Wearables can sync workout data and enrich scoring.
- Fitness score is based on workout minutes, calories, completed workouts, and
  available wearable metrics.
- Challenges can be free-for-all or teams mode.
- Teams challenges support two to four teams.
- Teams-mode invitees choose a team when accepting an invitation.
- Team score is the sum of active members' challenge fitness scores.
- Leaderboards are challenge-specific.
- Notifications cover invites, activity, leaderboard changes, streaks, and
  challenge updates.
- Titles unlock from lifetime fitness score milestones.

Avoid these unsupported or risky implications:

- Do not imply team challenges can be joined through public share links.
- Do not imply full chat/messaging if it is not part of the current product.
- Do not imply AI coaching, meal planning, or training plans.
- Do not imply all wearable providers have identical maturity.
- Do not show medical-grade claims or health outcomes.

## Existing Asset Use

Use existing brand images sparingly:

- Logo in the section header or footer lockup.
- App icon as a small brand anchor.
- Do not use the app icon as a substitute for every explanatory visual.

If the website repo cannot access this mobile app repo, export or copy only the
approved brand assets needed by the website. Final copies should live in the
website repo.
