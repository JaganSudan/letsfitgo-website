'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Dumbbell,
  Eye,
  LifeBuoy,
  Medal,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  UserPlus,
  UsersRound,
  Watch,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type QuickLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type ArticleLink = {
  title: string;
  href: string;
};

type DocsCategory = {
  id: string;
  title: string;
  purpose: string;
  icon: LucideIcon;
  articles: ArticleLink[];
  notes: string[];
};

type PopularGuide = {
  id: string;
  title: string;
  description: string;
  readTime: string;
  icon: LucideIcon;
  shortAnswer: string;
  whenToUse: string;
  steps: string[];
  next: string;
  commonIssues: Array<{
    issue: string;
    fix: string;
  }>;
  related: string[];
};

type VisualExample = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const quickLinks: QuickLink[] = [
  { label: 'Getting started', href: '#start-here', icon: CheckCircle2 },
  { label: 'Create a challenge', href: '#guide-create-your-first-challenge', icon: Trophy },
  { label: 'Log a workout', href: '#guide-log-your-first-workout', icon: Dumbbell },
  { label: 'Understand points', href: '#guide-how-points-work', icon: Star },
  { label: 'Invite friends', href: '#guide-invite-friends', icon: UserPlus },
  { label: 'Connect a wearable', href: '#guide-connect-a-wearable', icon: Watch },
];

const startSteps = [
  'Create your account and finish onboarding.',
  'Join or create your first challenge.',
  'Invite friends who will keep it active with you.',
  'Log your first workout manually or from a supported wearable.',
  'Check your points and leaderboard.',
  'Turn on notifications so group activity is visible.',
];

const categories: DocsCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    purpose: 'Understand LFG, finish setup, and get into your first challenge without needing a complicated fitness plan.',
    icon: BookOpen,
    articles: [
      { title: 'What is LFG?', href: '#guide-what-is-lfg' },
      { title: 'Create your account', href: '#start-here' },
      { title: 'Complete onboarding', href: '#start-here' },
      { title: 'Set up your profile', href: '#privacy-and-data-visibility' },
      { title: 'Turn on notifications', href: '#notifications-and-settings' },
      { title: 'Your first 10 minutes in LFG', href: '#start-here' },
    ],
    notes: [
      'LFG is a social fitness challenge app.',
      'Start with one challenge, one group of friends, and one workout.',
      'Notifications help you keep up with the people in your challenge.',
    ],
  },
  {
    id: 'challenges',
    title: 'Challenges',
    purpose: 'Learn how to create, join, invite, and follow the main challenge loop.',
    icon: Trophy,
    articles: [
      { title: 'Create a challenge', href: '#guide-create-your-first-challenge' },
      { title: 'Join a challenge', href: '#guide-create-your-first-challenge' },
      { title: 'Invite friends to a challenge', href: '#guide-invite-friends' },
      { title: 'Public challenges vs friend invites', href: '#guide-team-challenges-explained' },
      { title: 'Leave or remove a challenge', href: '#troubleshooting' },
      { title: 'Challenge rules and timing', href: '#guide-create-your-first-challenge' },
    ],
    notes: [
      'Challenges can rank people individually or group people into teams.',
      'Free-for-all challenges can use easier share-style joining.',
      'Team challenge invitations include team selection when the invite is accepted.',
    ],
  },
  {
    id: 'workouts-and-points',
    title: 'Workouts And Points',
    purpose: 'See how manual workouts and synced activity become visible challenge progress.',
    icon: Dumbbell,
    articles: [
      { title: 'Log a workout manually', href: '#guide-log-your-first-workout' },
      { title: 'Connect a wearable', href: '#guide-connect-a-wearable' },
      { title: 'How points work', href: '#guide-how-points-work' },
      { title: 'Why points may update after saving', href: '#guide-fix-missing-workouts-or-points' },
      { title: 'View workout history', href: '#guide-log-your-first-workout' },
      { title: 'Edit or remove a workout', href: '#troubleshooting' },
    ],
    notes: [
      'Workout minutes, calories, and completed workouts are the simple baseline.',
      'Supported wearables can add more context, such as steps, distance, and heart-rate zones.',
      'Points make different types of activity easier to compare.',
    ],
  },
  {
    id: 'friends-and-invites',
    title: 'Friends And Invites',
    purpose: 'Add people, accept requests, and bring friends into the right challenge flow.',
    icon: UserPlus,
    articles: [
      { title: 'Add friends', href: '#guide-invite-friends' },
      { title: 'Find friends by username or email', href: '#guide-invite-friends' },
      { title: 'Sync contacts', href: '#guide-invite-friends' },
      { title: 'Send a friend request', href: '#guide-invite-friends' },
      { title: 'Accept a challenge invitation', href: '#guide-invite-friends' },
      { title: 'Choose a team from an invitation', href: '#guide-team-challenges-explained' },
    ],
    notes: [
      'Friends can be found through search and contact matching.',
      'Challenge invitations appear in the app invitation surfaces.',
      'Team invites guide the invitee through picking or confirming a team.',
    ],
  },
  {
    id: 'leaderboards-and-teams',
    title: 'Leaderboards And Teams',
    purpose: 'Understand rank, team scores, recent activity, streaks, and visible progress.',
    icon: Medal,
    articles: [
      { title: 'How leaderboards work', href: '#guide-team-challenges-explained' },
      { title: 'Understand your rank', href: '#guide-how-points-work' },
      { title: 'Team challenges', href: '#guide-team-challenges-explained' },
      { title: 'Team score and team rankings', href: '#guide-team-challenges-explained' },
      { title: 'Recent team activity', href: '#visual-examples' },
      { title: 'Streaks and titles', href: '#guide-how-points-work' },
    ],
    notes: [
      'Leaderboards belong to a specific challenge.',
      'Teams combine points from active team members.',
      'Titles like Rookie, Foot Soldier, and GOAT make progress easier to spot.',
    ],
  },
  {
    id: 'wearables',
    title: 'Wearables',
    purpose: 'Connect supported wearables when you want activity to sync without manual entry.',
    icon: Watch,
    articles: [
      { title: 'Connect a wearable', href: '#guide-connect-a-wearable' },
      { title: 'Sync recent workouts', href: '#guide-connect-a-wearable' },
      { title: 'Disconnect a wearable', href: '#guide-connect-a-wearable' },
      { title: 'Why a wearable workout may not appear', href: '#guide-fix-missing-workouts-or-points' },
      { title: 'Wearable permissions and privacy', href: '#privacy-and-data-visibility' },
    ],
    notes: [
      'Wearable sync is optional.',
      'Provider availability and behavior can vary by platform and account setup.',
      'You can always log a workout manually if sync is not available.',
    ],
  },
  {
    id: 'notifications-and-settings',
    title: 'Notifications And Settings',
    purpose: 'Keep group activity visible while controlling when and how LFG notifies you.',
    icon: Bell,
    articles: [
      { title: 'Turn notifications on or off', href: '#notifications-and-settings' },
      { title: 'Challenge notifications', href: '#notifications-and-settings' },
      { title: 'Friend activity notifications', href: '#notifications-and-settings' },
      { title: 'Leaderboard notifications', href: '#notifications-and-settings' },
      { title: 'Streak reminders', href: '#notifications-and-settings' },
      { title: 'Quiet hours', href: '#notifications-and-settings' },
    ],
    notes: [
      'Notifications help you keep up with your group.',
      'You can adjust invite, workout, leaderboard, streak, and reminder notifications.',
      'Quiet hours reduce late or unwanted pings.',
    ],
  },
  {
    id: 'privacy-and-data-visibility',
    title: 'Privacy And Data Visibility',
    purpose: 'Know what friends and challenge members can see before you join in.',
    icon: ShieldCheck,
    articles: [
      { title: 'What friends can see', href: '#privacy-and-data-visibility' },
      { title: 'What challenge participants can see', href: '#privacy-and-data-visibility' },
      { title: 'Wearable data and permissions', href: '#privacy-and-data-visibility' },
      { title: 'Profile visibility', href: '#privacy-and-data-visibility' },
      { title: 'Notification privacy', href: '#privacy-and-data-visibility' },
    ],
    notes: [
      'Challenge members can see your challenge progress, ranking, and activity needed for competition.',
      'Wearable permissions are controlled by the app and the connected platform.',
      'For legal details, use the full Privacy Policy.',
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    purpose: 'Try the simple fixes first when something does not show up where you expect.',
    icon: LifeBuoy,
    articles: [
      { title: 'My workout is missing', href: '#guide-fix-missing-workouts-or-points' },
      { title: 'My points did not update', href: '#guide-fix-missing-workouts-or-points' },
      { title: 'My leaderboard looks stale', href: '#guide-fix-missing-workouts-or-points' },
      { title: 'I did not receive an invite', href: '#troubleshooting' },
      { title: 'My wearable will not connect', href: '#guide-connect-a-wearable' },
      { title: 'I cannot find a friend', href: '#guide-invite-friends' },
    ],
    notes: [
      'Refresh the relevant screen first.',
      'Check permissions and the selected challenge.',
      'Contact support if the same issue continues.',
    ],
  },
];

const popularGuides: PopularGuide[] = [
  {
    id: 'what-is-lfg',
    title: 'What is LFG?',
    description: 'A quick overview of challenges, workouts, points, friends, and leaderboards.',
    readTime: '2 min',
    icon: BookOpen,
    shortAnswer:
      'LFG is a social fitness challenge app. You join or create a challenge, log workouts, earn points, and stay accountable with friends.',
    whenToUse:
      'Use this guide when you are opening LFG for the first time or explaining it to a friend who is not already into fitness apps.',
    steps: [
      'Create your account and complete the short onboarding flow.',
      'Join or create one challenge with people you know.',
      'Log a workout manually or connect a supported wearable.',
      'Watch your points, rank, and group activity update inside the challenge.',
    ],
    next:
      'You should understand the main loop: friends create accountability, workouts create points, and the leaderboard keeps progress visible.',
    commonIssues: [
      { issue: 'I am not very fit yet.', fix: 'Start with one simple activity. Walks, gym sessions, sports, and other workouts can all count.' },
      { issue: 'I do not have a wearable.', fix: 'Use manual workout logging. Wearables are optional.' },
    ],
    related: ['Create your first challenge', 'Log your first workout', 'How points work'],
  },
  {
    id: 'create-your-first-challenge',
    title: 'Create your first challenge',
    description: 'Set up a challenge with a clear name, timeline, and invite path.',
    readTime: '4 min',
    icon: Trophy,
    shortAnswer:
      'Create a challenge when you want a shared goal with friends. Pick the challenge style, add the basics, invite people, and start tracking progress.',
    whenToUse:
      'Use this when you want to be the person who starts the group challenge, sets the tone, and invites the first participants.',
    steps: [
      'Open the create challenge flow in the app.',
      'Add a name, description, duration, and participant limit.',
      'Choose whether the challenge is individual or team-based.',
      'Invite friends from the challenge invite flow.',
      'Check the challenge overview before people begin logging workouts.',
    ],
    next:
      'Participants can join, log workouts, and see progress in the challenge leaderboard. Team challenges route invitees through team selection.',
    commonIssues: [
      { issue: 'A friend joined the wrong flow.', fix: 'Use the direct team invite path for team challenges so they can choose the right team.' },
      { issue: 'The challenge feels too intense.', fix: 'Shorten the duration, keep the group small, and explain that any workout can help.' },
    ],
    related: ['Invite friends', 'Team challenges explained', 'How points work'],
  },
  {
    id: 'log-your-first-workout',
    title: 'Log your first workout',
    description: 'Add activity manually or from a supported wearable so it counts toward the challenge.',
    readTime: '3 min',
    icon: Dumbbell,
    shortAnswer:
      'Log a workout after you move. Add the activity type, duration, and any available details so LFG can turn the effort into points.',
    whenToUse:
      'Use this after a walk, gym session, sport, HIIT workout, or any other activity you want to count toward a challenge.',
    steps: [
      'Open the workout action in the app.',
      'Choose manual logging or select a synced workout if one is available.',
      'Pick the workout type, such as cardio, strength, HIIT, sports, or other activity.',
      'Add duration, calories, distance, and intensity when you have them.',
      'Save the workout and check the challenge for points and leaderboard changes.',
    ],
    next:
      'The workout appears in your history and can move your challenge score. Some synced details may take a moment to settle after saving.',
    commonIssues: [
      { issue: 'I forgot some details.', fix: 'Add what you know. Duration and completed workout details are enough to start.' },
      { issue: 'I logged it in the wrong challenge.', fix: 'Open the workout or challenge history and check whether editing or removing is available.' },
    ],
    related: ['How points work', 'Connect a wearable', 'Fix missing workouts or points'],
  },
  {
    id: 'how-points-work',
    title: 'How points work',
    description: 'Understand how different workout types become one comparable score.',
    readTime: '3 min',
    icon: Star,
    shortAnswer:
      'Points make different types of activity easier to compare. A quick workout, a walk, a gym session, or a synced wearable workout can all move your score.',
    whenToUse:
      'Use this when you want to know why your workout changed your score or why different activities can still compete on the same leaderboard.',
    steps: [
      'Log a workout or sync one from a supported wearable.',
      'LFG looks at simple effort signals like minutes, calories, and completed workouts.',
      'When wearable metrics are available, steps, distance, and heart-rate zones can add more context.',
      'Your points are added to the relevant challenge leaderboard.',
    ],
    next:
      'Your challenge rank can change after points are applied. The goal is to compare effort without forcing everyone into the same workout type.',
    commonIssues: [
      { issue: 'My points changed after saving.', fix: 'Synced details can update after the first save, especially when wearable data finishes syncing.' },
      { issue: 'A workout earned fewer points than expected.', fix: 'Check that duration, calories, distance, or synced wearable details are present.' },
    ],
    related: ['Log your first workout', 'Team challenges explained', 'Fix missing workouts or points'],
  },
  {
    id: 'invite-friends',
    title: 'Invite friends',
    description: 'Find friends, send requests, and bring them into a challenge.',
    readTime: '3 min',
    icon: UserPlus,
    shortAnswer:
      'Add friends through search or contact matching, then invite them into a challenge from the challenge invite flow.',
    whenToUse:
      'Use this when your challenge needs people or when someone has asked to join your group.',
    steps: [
      'Open the friends area in the app.',
      'Search by username or email, or use contact matching if available.',
      'Send a friend request and wait for the person to accept.',
      'Open your challenge and choose the invite action.',
      'Select the friends you want to invite.',
    ],
    next:
      'Free-for-all invitations can be accepted directly. Team challenge invitations take the invitee through team selection.',
    commonIssues: [
      { issue: 'I cannot find a friend.', fix: 'Check the spelling, try their email, or ask them to finish account setup first.' },
      { issue: 'They did not receive the invite.', fix: 'Ask them to check the invitations area and confirm notifications are allowed.' },
    ],
    related: ['Create your first challenge', 'Team challenges explained', 'Notifications And Settings'],
  },
  {
    id: 'team-challenges-explained',
    title: 'Team challenges explained',
    description: 'How teams, team selection, team scores, and team leaderboards work.',
    readTime: '4 min',
    icon: UsersRound,
    shortAnswer:
      'Team challenges group people together so everyone can contribute. Team rankings use the combined progress from active team members.',
    whenToUse:
      'Use this when you want group accountability without making every person compete only as an individual.',
    steps: [
      'Create or join a team challenge.',
      'Accept the invite and choose a team when prompted.',
      'Log workouts as usual.',
      'Check team rankings, member stats, and recent activity in the team challenge view.',
      'Use friend activity and leaderboard changes to keep the group moving.',
    ],
    next:
      'Your individual workouts contribute to your team score. The team leaderboard shows how groups compare inside that challenge.',
    commonIssues: [
      { issue: 'Someone needs a team assignment.', fix: 'Use the team challenge invite flow so they can select or confirm their team when accepting.' },
      { issue: 'Team score looks lower than expected.', fix: 'Confirm that team members logged workouts inside the same active challenge.' },
    ],
    related: ['Invite friends', 'How points work', 'Fix missing workouts or points'],
  },
  {
    id: 'connect-a-wearable',
    title: 'Connect a wearable',
    description: 'Use supported wearable sync when you want workouts to appear with less manual entry.',
    readTime: '3 min',
    icon: Watch,
    shortAnswer:
      'Connect supported wearables in the app if you want eligible workouts to sync. Wearable sync is optional, and availability can vary by platform and account setup.',
    whenToUse:
      'Use this when you already track activity on a phone, watch, or fitness device and want LFG to use that activity in challenges.',
    steps: [
      'Open settings or the wearable connection area in the app.',
      'Choose a supported wearable or health data source available on your device.',
      'Approve the requested permissions.',
      'Return to LFG and sync recent workouts when the option is available.',
      'Log or confirm the workout so it can count toward the challenge.',
    ],
    next:
      'Synced workouts can appear in the workout flow. You can still log activity manually whenever wearable sync is unavailable.',
    commonIssues: [
      { issue: 'A workout does not appear.', fix: 'Check permissions, open the provider app, then refresh or sync recent workouts in LFG.' },
      { issue: 'The provider is not listed.', fix: 'Use manual logging and check the app later, since provider availability can vary.' },
    ],
    related: ['Log your first workout', 'How points work', 'Privacy And Data Visibility'],
  },
  {
    id: 'fix-missing-workouts-or-points',
    title: 'Fix missing workouts or points',
    description: 'Try the first checks when a workout, score, invite, or leaderboard update is missing.',
    readTime: '4 min',
    icon: RefreshCw,
    shortAnswer:
      'Start by refreshing the screen, checking the selected challenge, and confirming that the workout or wearable sync finished.',
    whenToUse:
      'Use this when a workout is missing, points did not update, a leaderboard looks stale, or an invite is not where you expected.',
    steps: [
      'Refresh the challenge, workout history, or invitations screen.',
      'Confirm you are looking at the correct challenge and date range.',
      'For wearable workouts, check that permissions are still enabled and recent activity has synced.',
      'For manual workouts, confirm the workout was saved and has the right activity details.',
      'If the issue continues, contact support with the challenge name, workout time, and what you expected to see.',
    ],
    next:
      'Most missing items appear after the right screen refreshes or sync finishes. Support can help when the same issue keeps happening.',
    commonIssues: [
      { issue: 'Leaderboard looks stale.', fix: 'Refresh the challenge and check whether the workout was saved to that challenge.' },
      { issue: 'Invite is missing.', fix: 'Check the invitations area and ask the sender to confirm they invited the correct account.' },
    ],
    related: ['Log your first workout', 'Connect a wearable', 'Invite friends'],
  },
];

const visualExamples: VisualExample[] = [
  {
    title: 'Create or join',
    description: 'Start with one challenge and a group that will notice when you show up.',
    image: {
      src: '/how-it-works-create-or-join.png',
      alt: 'LFG challenge overview and leaderboard screen',
      width: 590,
      height: 1278,
    },
  },
  {
    title: 'Log the workout',
    description: 'Manual logging and supported wearable sync both lead back to challenge progress.',
    image: {
      src: '/how-it-works-log-workout.png',
      alt: 'LFG add workout flow with manual and wearable options',
      width: 590,
      height: 1278,
    },
  },
  {
    title: 'Check the group',
    description: 'Leaderboards, teams, and recent activity show what changed after people move.',
    image: {
      src: '/features-teams-leaderboard.png',
      alt: 'LFG team challenge leaderboard and recent activity screen',
      width: 376,
      height: 780,
    },
  },
];

const troubleshootingItems = [
  {
    title: 'My workout is missing',
    steps: ['Refresh workout history.', 'Check the correct challenge and date.', 'For synced workouts, confirm wearable permissions.'],
  },
  {
    title: 'My points did not update',
    steps: ['Open the challenge again.', 'Confirm the workout saved.', 'Wait for synced wearable details to finish updating.'],
  },
  {
    title: 'I did not receive an invite',
    steps: ['Check the invitations area.', 'Confirm the sender used the right account.', 'Turn on challenge notifications.'],
  },
  {
    title: 'I cannot find a friend',
    steps: ['Search by username.', 'Try their email.', 'Ask them to complete account setup.'],
  },
];

const pageSections = [
  { id: 'overview', label: 'LFG Docs' },
  { id: 'start-here', label: 'Start here' },
  { id: 'popular-guides', label: 'Popular guides' },
  { id: 'categories', label: 'Categories' },
  { id: 'visual-examples', label: 'Visual examples' },
  { id: 'guide-answers', label: 'Guide answers' },
  { id: 'notifications-and-settings', label: 'Notifications' },
  { id: 'privacy-and-data-visibility', label: 'Privacy' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'support', label: 'Support' },
];

function getGuideSearchText(guide: PopularGuide) {
  return [
    guide.title,
    guide.description,
    guide.shortAnswer,
    guide.whenToUse,
    ...guide.steps,
    guide.next,
    ...guide.commonIssues.flatMap((issue) => [issue.issue, issue.fix]),
    ...guide.related,
  ].join(' ');
}

export default function DocsPageContent() {
  const [query, setQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState('overview');
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return categories;

    return categories
      .map((category) => {
        const matchingArticles = category.articles.filter((article) =>
          `${article.title} ${category.title} ${category.purpose}`.toLowerCase().includes(normalizedQuery)
        );

        const categoryMatches = `${category.title} ${category.purpose} ${category.notes.join(' ')}`
          .toLowerCase()
          .includes(normalizedQuery);

        return {
          ...category,
          articles: categoryMatches ? category.articles : matchingArticles,
        };
      })
      .filter((category) => category.articles.length > 0);
  }, [normalizedQuery]);

  const filteredGuides = useMemo(() => {
    if (!normalizedQuery) return popularGuides;

    return popularGuides.filter((guide) => getGuideSearchText(guide).toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery]);

  const hasResults = filteredCategories.length > 0 || filteredGuides.length > 0;
  const visiblePageSections = useMemo(
    () =>
      pageSections.filter((section) => {
        if (section.id === 'categories') return filteredCategories.length > 0;
        if (section.id === 'popular-guides' || section.id === 'guide-answers') return filteredGuides.length > 0;
        return true;
      }),
    [filteredCategories.length, filteredGuides.length]
  );
  const observedSectionIds = useMemo(
    () =>
      Array.from(
        new Set([
          ...visiblePageSections.map((section) => section.id),
          ...filteredCategories.map((category) => `category-${category.id}`),
          ...filteredGuides.map((guide) => `guide-${guide.id}`),
        ])
      ),
    [filteredCategories, filteredGuides, visiblePageSections]
  );
  const rightActiveId = visiblePageSections.some((section) => section.id === activeSectionId)
    ? activeSectionId
    : activeSectionId.startsWith('guide-')
      ? 'guide-answers'
      : activeSectionId.startsWith('category-')
        ? 'categories'
        : activeSectionId;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;

      event.preventDefault();

      const searchInputId = window.matchMedia('(min-width: 1024px)').matches
        ? 'docs-desktop-search'
        : 'docs-mobile-search';
      const searchInput = document.getElementById(searchInputId) as HTMLInputElement | null;

      searchInput?.focus();
      searchInput?.select();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const visibleSections = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (visibleSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

        if (visibleEntry?.target.id) {
          setActiveSectionId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-18% 0px -68% 0px',
        threshold: [0, 0.2, 1],
      }
    );

    visibleSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [observedSectionIds]);

  return (
    <main className="min-h-screen bg-[#fbfcff] text-gray-950 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,920px)_280px]">
      <DocsSidebar
        query={query}
        onQueryChange={setQuery}
        filteredCategories={filteredCategories}
        filteredGuides={filteredGuides}
        activeSectionId={activeSectionId}
      />
      <DocsMobileHeader query={query} onQueryChange={setQuery} />

      <article className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-16 xl:px-14">
        <section id="overview" className="scroll-mt-24 border-b border-gray-200 pb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0070c9]">Help center</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-normal text-gray-950 sm:text-5xl">
            LFG Docs
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-xl leading-9 text-gray-600">
            Learn how challenges, workouts, points, teams, and friend activity work in LFG.
          </p>
          <div className="mt-9 space-y-6 text-[1.05rem] leading-8 text-gray-700">
            <p>
              LFG is a social fitness challenge app for people who want more motivation from friends, visible points, and lightweight accountability.
            </p>
            <p>
              Start a challenge with friends, log a workout, earn points, and check the leaderboard. The docs below explain each part of that loop without getting into technical implementation details.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <InfoTile icon={Trophy} title="Challenges" description="Join or create the shared goal." />
            <InfoTile icon={Dumbbell} title="Workouts" description="Log movement manually or from supported wearables." />
            <InfoTile icon={UsersRound} title="Friends" description="Use invites and activity updates for accountability." />
          </div>
        </section>

        <section id="start-here" className="scroll-mt-24 border-b border-gray-200 py-12">
          <DocsSectionHeader
            eyebrow="Start here"
            title="Start with one challenge, one group, and one workout."
            description="The fastest path through LFG is intentionally simple. Set up the account, get people in, and make the first workout visible."
          />
          <ol className="mt-7 grid gap-3 sm:grid-cols-2">
            {startSteps.map((step, index) => (
              <li key={step} className="flex min-h-24 gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-950 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm leading-6 text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="popular-guides" className="scroll-mt-24 border-b border-gray-200 py-12">
          <DocsSectionHeader
            eyebrow="Popular guides"
            title="The questions most people ask first"
            description="Short, task-based guides for the highest-intent moments in the app."
          />
          {!hasResults && <NoResults query={query} onClear={() => setQuery('')} />}
          {filteredGuides.length > 0 && (
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {filteredGuides.map((guide) => (
                <GuideSummaryCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
        </section>

        {filteredCategories.length > 0 && (
          <section id="categories" className="scroll-mt-24 border-b border-gray-200 py-12">
            <DocsSectionHeader
              eyebrow="Categories"
              title="Find help by app area"
              description="Browse the main parts of LFG: challenges, workouts, friends, leaderboards, wearables, notifications, privacy, and troubleshooting."
            />
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {filteredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}

        <section id="visual-examples" className="scroll-mt-24 border-b border-gray-200 py-12">
          <DocsSectionHeader
            eyebrow="Visual examples"
            title="What the main flows look like"
            description="These examples use demo screens and focus on app behavior rather than generic fitness imagery."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {visualExamples.map((example) => (
              <article key={example.title} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex min-h-[300px] items-center justify-center bg-[linear-gradient(180deg,#f8fbff,#ffffff)] p-5">
                  <PhoneFrame className="w-[150px]">
                    <Image
                      src={example.image.src}
                      alt={example.image.alt}
                      width={example.image.width}
                      height={example.image.height}
                      sizes="180px"
                      className="h-auto w-full"
                      unoptimized
                    />
                  </PhoneFrame>
                </div>
                <div className="border-t border-gray-200 p-4">
                  <h3 className="text-base font-semibold text-gray-950">{example.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{example.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {filteredGuides.length > 0 && (
          <section id="guide-answers" className="scroll-mt-24 border-b border-gray-200 py-12">
            <DocsSectionHeader
              eyebrow="Guide answers"
              title="Quick answers and next steps"
              description="Each guide starts with the short answer, then gives practical steps and common fixes."
            />
            <div className="mt-7 grid gap-5">
              {filteredGuides.map((guide) => (
                <GuideArticle key={guide.id} guide={guide} />
              ))}
            </div>
          </section>
        )}

        <section id="notifications-and-settings" className="scroll-mt-24 border-b border-gray-200 py-12">
          <DocsSectionHeader
            eyebrow="Notifications"
            title="Keep motivation visible, then tune the noise down."
            description="Notifications help you keep up with challenge invites, friend activity, leaderboard changes, streak milestones, and reminders. You stay in control through notification settings and quiet hours."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <InfoTile icon={Bell} title="Challenge invites" description="See when someone brings you into a challenge." />
            <InfoTile icon={Activity} title="Friend activity" description="Know when people in your group complete workouts." />
            <InfoTile icon={Trophy} title="Leaderboard changes" description="Catch rank and score movement inside a challenge." />
            <InfoTile icon={Settings} title="Quiet hours" description="Reduce late or unwanted notifications." />
          </div>
        </section>

        <section id="privacy-and-data-visibility" className="scroll-mt-24 border-b border-gray-200 py-12">
          <DocsSectionHeader
            eyebrow="Privacy"
            title="Know what people can see before you join."
            description="Challenge participation makes relevant fitness progress visible to challenge members. Members can see progress, ranking, and activity needed for the competition."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <InfoTile icon={UsersRound} title="Friends" description="Friends help you find people and send challenge invites." />
            <InfoTile icon={Eye} title="Challenge members" description="Members can see challenge progress and ranking." />
            <InfoTile icon={Watch} title="Wearable permissions" description="Connected platforms control which wearable data is shared." />
            <InfoTile icon={ShieldCheck} title="Profile visibility" description="Use settings and the Privacy Policy for more detail." />
          </div>
          <Link href="/privacy" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0070c9] hover:text-gray-950">
            Read the Privacy Policy
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section id="troubleshooting" className="scroll-mt-24 border-b border-gray-200 py-12">
          <DocsSectionHeader
            eyebrow="Troubleshooting"
            title="Try this first"
            description="Plain-English checks for missing workouts, points, invites, friends, or notifications."
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {troubleshootingItems.map((item) => (
              <article key={item.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e9f7ff] text-[#0070c9]">
                    <RefreshCw className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-gray-950">{item.title}</h3>
                </div>
                <ol className="mt-4 space-y-3">
                  {item.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-gray-600">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-semibold text-gray-700">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section id="support" className="scroll-mt-24 py-12">
          <div className="rounded-lg bg-gray-950 p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7ddcff]">Need more help?</p>
            <h2 className="mt-3 text-3xl font-medium tracking-normal">Contact LFG support</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
              Tell us what you were trying to do, the challenge name, and what you expected to see. Use demo screenshots only when sharing examples.
            </p>
            <a
              href="mailto:support@letsfitgo.com"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-gray-950 transition-colors hover:bg-[#dff6ff]"
            >
              <LifeBuoy className="h-4 w-4" aria-hidden="true" />
              support@letsfitgo.com
            </a>
          </div>
        </section>
      </article>

      <PageIndex items={visiblePageSections} activeId={rightActiveId} />
    </main>
  );
}

function DocsMobileHeader({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="LFG home" className="flex items-center gap-2">
          <Image src="/Untitled design (9).png" alt="LFG" width={107} height={32} className="h-7 w-auto object-contain" priority />
          <span className="h-5 w-px bg-gray-200" aria-hidden="true" />
          <span className="text-sm font-semibold text-gray-600">Docs</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-950">
          Main site
        </Link>
      </div>
      <div className="mt-3">
        <SearchBox id="docs-mobile-search" query={query} onQueryChange={onQueryChange} />
      </div>
    </header>
  );
}

function DocsSidebar({
  query,
  onQueryChange,
  filteredCategories,
  filteredGuides,
  activeSectionId,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  filteredCategories: DocsCategory[];
  filteredGuides: PopularGuide[];
  activeSectionId: string;
}) {
  return (
    <aside className="sticky top-0 hidden h-screen overflow-y-auto border-r border-gray-200 bg-[#f5f7fb] px-4 py-5 lg:block">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" aria-label="LFG home" className="flex min-w-0 items-center gap-2">
          <Image src="/Untitled design (9).png" alt="LFG" width={107} height={32} className="h-8 w-auto max-w-[112px] object-contain" priority />
          <span className="h-6 w-px bg-gray-300" aria-hidden="true" />
          <span className="text-base font-semibold text-gray-600">Docs</span>
        </Link>
      </div>

      <div className="mt-7">
        <SearchBox id="docs-desktop-search" query={query} onQueryChange={onQueryChange} />
      </div>

      <nav className="mt-7 space-y-8" aria-label="Docs navigation">
        <div className="space-y-1">
          <SidebarLink href="/" label="Main site" icon={ArrowRight} />
          <SidebarLink href="#overview" label="LFG Docs" icon={BookOpen} active={activeSectionId === 'overview'} />
          <SidebarLink href="#start-here" label="Start here" icon={CheckCircle2} active={activeSectionId === 'start-here'} />
        </div>

        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Categories</p>
          <div className="mt-2 space-y-1">
            {filteredCategories.map((category) => (
              <SidebarLink
                key={category.id}
                href={`#category-${category.id}`}
                label={category.title}
                icon={category.icon}
                active={activeSectionId === `category-${category.id}`}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Popular guides</p>
          <div className="mt-2 space-y-1">
            {filteredGuides.map((guide) => (
              <SidebarLink
                key={guide.id}
                href={`#guide-${guide.id}`}
                label={guide.title}
                icon={guide.icon}
                active={activeSectionId === `guide-${guide.id}`}
              />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

function SearchBox({
  id,
  query,
  onQueryChange,
}: {
  id: string;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Search LFG docs
      </label>
      <div className="flex min-h-12 items-center gap-3 rounded-lg border border-[#d8e3f7] bg-white px-3 shadow-sm">
        <Search className="h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search"
          className="h-11 min-w-0 flex-1 bg-transparent text-base text-gray-950 outline-none placeholder:text-gray-500"
        />
        <span className="hidden rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 sm:inline-flex">
          Ctrl K
        </span>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  active = false,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        active ? 'bg-[#dfe6ef] text-[#183b66]' : 'text-gray-600 hover:bg-white hover:text-gray-950'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function PageIndex({
  items,
  activeId,
}: {
  items: Array<{ id: string; label: string }>;
  activeId: string;
}) {
  return (
    <aside className="sticky top-0 hidden h-screen overflow-y-auto border-l border-gray-200 bg-[#fbfcff] px-6 py-16 xl:block">
      <div className="text-sm">
        <div className="mb-4 flex items-center gap-2 font-semibold text-gray-500">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          On this page
        </div>
        <nav className="space-y-1" aria-label="On this page">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'block border-l-2 py-2 pl-4 leading-5 transition-colors',
                  isActive
                    ? 'border-[#183b66] font-semibold text-[#183b66]'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900'
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function DocsSectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0070c9]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-gray-950">{title}</h2>
      <p className="mt-3 text-base leading-7 text-gray-600">{description}</p>
    </div>
  );
}

function GuideSummaryCard({ guide }: { guide: PopularGuide }) {
  const Icon = guide.icon;

  return (
    <a
      href={`#guide-${guide.id}`}
      className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-[#8ebfee]"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e9f7ff] text-[#0070c9]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold leading-6 text-gray-950">{guide.title}</h3>
            <span className="text-xs font-medium text-gray-500">{guide.readTime}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-gray-600">{guide.description}</p>
        </div>
      </div>
    </a>
  );
}

function DocsHero({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#effcff_0%,#ffffff_100%)] px-4 pb-14 pt-[calc(7.5rem+env(safe-area-inset-top))] sm:px-6 lg:px-8 lg:pt-36">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0091FF]">Help center</p>
          <h1 className="mt-4 text-balance text-4xl font-medium tracking-normal text-gray-950 sm:text-5xl md:text-6xl">
            LFG Docs
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-gray-600">
            Learn how challenges, workouts, points, teams, and friend activity work in LFG.
          </p>

          <div className="mt-8 max-w-2xl">
            <label htmlFor="docs-search" className="sr-only">
              Search LFG docs
            </label>
            <div className="flex min-h-14 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.72)]">
              <Search className="h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
              <input
                id="docs-search"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search challenges, workouts, points, invites..."
                className="h-12 min-w-0 flex-1 bg-transparent text-base text-gray-950 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#0091FF]/45 hover:text-[#0070c9]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-[360px] lg:block">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-[0_26px_90px_-62px_rgba(15,23,42,0.7)]">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Today</p>
                <p className="mt-1 text-sm font-semibold text-gray-950">Challenge activity</p>
              </div>
              <span className="rounded-md bg-[#e9f7ff] px-2.5 py-1 text-xs font-semibold text-[#0070c9]">+115 pts</span>
            </div>
            <div className="mt-4 space-y-3">
              <MiniActivity icon={Dumbbell} title="Workout logged" description="24 min strength session" />
              <MiniActivity icon={Trophy} title="Leaderboard moved" description="You moved into 3rd place" />
              <MiniActivity icon={UsersRound} title="Team activity" description="A teammate added points" />
              <MiniActivity icon={Bell} title="Reminder ready" description="Group updates are on" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0091FF]">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-normal text-gray-950 sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">{description}</p>
    </div>
  );
}

function GuideCard({ guide }: { guide: PopularGuide }) {
  const Icon = guide.icon;

  return (
    <a
      href={`#guide-${guide.id}`}
      className="group flex min-h-[220px] flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#0091FF]/45 hover:shadow-[0_20px_70px_-52px_rgba(0,145,255,0.8)]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#e9f7ff] text-[#0070c9]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {guide.readTime}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-6 text-gray-950">{guide.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">{guide.description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0070c9]">
        Open guide
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  );
}

function CategoryCard({ category }: { category: DocsCategory }) {
  const Icon = category.icon;

  return (
    <article id={`category-${category.id}`} className="scroll-mt-24 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gray-950 text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-gray-950">{category.title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">{category.purpose}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        {category.articles.map((article) => (
          <a
            key={article.title}
            href={article.href}
            className="group flex min-h-11 items-center justify-between gap-3 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[#0091FF]/45 hover:text-[#0070c9]"
          >
            <span>{article.title}</span>
            <ArrowRight className="h-4 w-4 shrink-0 opacity-45 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
          </a>
        ))}
      </div>

      <ul className="mt-5 space-y-2 border-t border-gray-200 pt-4">
        {category.notes.map((note) => (
          <li key={note} className="flex gap-2 text-sm leading-6 text-gray-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0091FF]" aria-hidden="true" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function GuideArticle({ guide }: { guide: PopularGuide }) {
  const Icon = guide.icon;

  return (
    <article id={`guide-${guide.id}`} className="scroll-mt-24 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#e9f7ff] text-[#0070c9]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-gray-950">{guide.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{guide.readTime} read</p>
        </div>
      </div>

      <GuideBlock icon={Zap} title="Short answer">
        <p>{guide.shortAnswer}</p>
      </GuideBlock>

      <GuideBlock icon={Target} title="When to use this">
        <p>{guide.whenToUse}</p>
      </GuideBlock>

      <GuideBlock icon={ClipboardCheck} title="Steps">
        <ol className="space-y-2">
          {guide.steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-semibold text-gray-700">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </GuideBlock>

      <GuideBlock icon={CheckCircle2} title="What happens next">
        <p>{guide.next}</p>
      </GuideBlock>

      <GuideBlock icon={RefreshCw} title="Common issues">
        <ul className="space-y-2">
          {guide.commonIssues.map((item) => (
            <li key={item.issue}>
              <span className="font-semibold text-gray-800">{item.issue}:</span> {item.fix}
            </li>
          ))}
        </ul>
      </GuideBlock>

      <div className="mt-5 border-t border-gray-200 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Related</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {guide.related.map((item) => (
            <span key={item} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function GuideBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-5">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#0070c9]" aria-hidden="true" />
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">{title}</h4>
      </div>
      <div className="text-sm leading-6 text-gray-700">{children}</div>
    </section>
  );
}

function InfoTile({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e9f7ff] text-[#0070c9]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-base font-semibold text-gray-950">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
    </article>
  );
}

function MiniActivity({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-700">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-950">{title}</p>
        <p className="text-xs leading-5 text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('w-[190px] max-w-full', className)}>
      <div className="relative overflow-hidden rounded-[30px] border-[7px] border-gray-950 bg-gray-950 shadow-xl shadow-gray-900/20">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[22px] bg-white">{children}</div>
      </div>
    </div>
  );
}

function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="mx-auto mt-8 max-w-7xl rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-gray-950">No docs found for &quot;{query}&quot;.</p>
      <p className="mt-2 text-sm text-gray-600">Try searching for challenges, points, workouts, invites, or wearables.</p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md bg-gray-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
      >
        Clear search
      </button>
    </div>
  );
}
