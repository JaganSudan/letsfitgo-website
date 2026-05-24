# How-It-Works Asset Brief

Status: Active  
Last Verified: 2026-05-22  
Primary Environment: External marketing website repo + LFG Expo mobile app context

## Objective

Create clean, product-relevant visuals for the LFG website "How it works"
section. The visuals should explain how users interact with LFG: create or join
fitness challenges, bring friends in, log workouts, earn points, climb
leaderboards, and keep momentum through social updates.

The best first-version strategy is a coded visual system. Use generated raster
images only as optional supporting media.

## Product Story

LFG turns workouts into social competition:

- Users create or join a fitness challenge.
- Challenges can be free-for-all or team based.
- Users add friends by search/contact sync and invite them into challenges.
- Teams-mode invites route invitees through a team selection step.
- Users log workouts manually or connect a wearable.
- Workouts generate a fitness score based on minutes, calories, workouts
  completed, and available wearable data such as steps, distance, and heart
  rate zones.
- Challenge leaderboards update from workout activity.
- Teams challenges show team ranking, team member stats, and recent team
  activity.
- Notifications keep users aware of challenge invites, workout completions,
  leaderboard changes, streak milestones, and challenge updates.
- Account titles are unlocked from lifetime fitness score milestones, starting
  with `Rookie`, then `Foot Soldier`, then `GOAT`.

## Recommended Visual Direction

Use simplified product UI illustrations rather than generic fitness images.
The page should feel like a clear walkthrough of the actual app behavior.

Preferred asset style:

- Clean phone or card mockups with real product concepts.
- High contrast black/white UI with restrained accent colors.
- Avatar stacks, team chips, points badges, leaderboards, streak marks, and
  notification bubbles.
- Coded vector/component assets that scale cleanly and can be animated lightly.

Avoid:

- Stock gym photography.
- AI-generated people exercising as the main explanation.
- Fake detailed screenshots unless the website agent has real UI references.
- Unsupported behaviors such as public team share links. Teams challenges are
  invitation-only in the current implementation.

## Recommended Asset Set

Use these as stable asset names in the website repo.

### `challenge-created`

Purpose: Explain challenge setup.

Visual: A phone/card mockup showing:

- Challenge name field or challenge card.
- Duration selector.
- `Team Challenge` toggle.
- Two to four team chips or rows.
- Small avatar stack to imply friends joining.

Copy pairing:

> Create a challenge, pick solo or team mode, and set the countdown.

### `invite-friends`

Purpose: Explain social onboarding into a challenge.

Visual: An invite panel showing:

- Friend search or contact results.
- Selectable friend rows.
- Avatar stack.
- `Send Invite` action.
- Optional team selection chips for team-mode context.

Copy pairing:

> Invite friends directly, or share a challenge link for free-for-all challenges.

Important behavior note: Team challenges use direct invitations and team
selection. Do not present public share-link joining as the primary team flow.

### `log-workout`

Purpose: Explain how activity becomes progress.

Visual: A workout card flowing into a points badge:

- Workout name, type, duration, calories, distance.
- Manual entry and wearable sync indicators.
- `+115 pts` or similar points badge.
- Small formula hints: minutes, calories, workout completion.

Copy pairing:

> Log a workout manually or sync a wearable. LFG turns effort into points.

### `leaderboard`

Purpose: Explain competition and feedback.

Visual: A podium or leaderboard component:

- Top three ranks.
- Current user row highlight.
- Fitness score values.
- Rank movement indicator.
- Streak badge.
- Optional team score bars for teams mode.

Copy pairing:

> Watch the leaderboard move as every workout changes the race.

### `momentum`

Purpose: Explain retention and fun.

Visual: A small activity stream:

- Notification bubbles for workout completion, invite, rank change, and streak.
- Title pill such as `Rookie` or `Foot Soldier`.
- Team recent activity item like "logged a 42min workout".

Copy pairing:

> Real-time updates keep the group active between workouts.

## Implementation Guidance

Build assets as coded components first:

- Use SVG, React, CSS, Canvas, or the website framework's native component
  system.
- Keep each asset self-contained and exportable.
- Use consistent dimensions, for example square or 4:3 cards, so the section
  can use a responsive grid.
- Add subtle motion only if it clarifies the flow: points counting up, rank row
  moving, notification sliding in, or team score bar filling.

Use generated bitmap assets only for:

- Abstract supporting textures.
- Social preview images.
- App-store style promotional composites.
- Non-product background art.

Do not rely on generated bitmaps for the main instructional steps; they are
harder to keep accurate and consistent.

## Existing App Asset Notes

Current usable brand assets in this repo:

- `ui/assets/homeandsplashscreenlfg.png` - transparent horizontal brand mark.
- `ui/assets/lfglogoblue.png` - blue horizontal logo variant.
- `ui/assets/lfglogo.png` - purple horizontal logo variant.
- `ui/assets/lfgappiconblue.png` - square app icon.
- `ui/assets/lfgappicon.png` - alternate square app icon.

Root-level files in `assets/` were checked on 2026-05-22 and reported as empty
PNG files, so do not treat them as usable source images without rechecking.

## Acceptance Criteria

The website asset set is successful when:

- Each visual maps to one clear step in the user journey.
- A visitor can understand the LFG loop without reading long copy.
- The visuals are recognizably product-specific: challenges, friends, workouts,
  points, leaderboards, teams, notifications, streaks, and titles.
- Assets do not imply unsupported flows.
- Assets are maintainable in the website repo and can be adjusted with copy or
  layout changes.
