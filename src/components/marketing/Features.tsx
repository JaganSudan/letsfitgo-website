'use client';

import Image from 'next/image';
import type { ComponentType, ReactNode } from 'react';
import { useState } from 'react';
import {
  Activity,
  BarChart3,
  Bell,
  CheckCircle2,
  Dumbbell,
  Flame,
  Gauge,
  Medal,
  MessageCircle,
  Trophy,
  UsersRound,
  Watch,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type FeatureId = 'logging' | 'score' | 'leaderboards' | 'updates';

type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Feature = {
  id: FeatureId;
  title: string;
  tabLabel: string;
  description: string;
  icon: LucideIcon;
  visualLabel: string;
  badge: string;
  screenshot?: Screenshot;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  flow: Array<{
    label: string;
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
};

const features: Feature[] = [
  {
    id: 'logging',
    title: 'Flexible Workout Logging',
    tabLabel: 'Logging',
    description: 'Connect your wearable, finish a workout, and log it in 3 taps. Manual logging is there as a backup when someone does not have a device.',
    icon: Dumbbell,
    visualLabel: 'Wearable-first flow',
    badge: '3 taps to logged',
    screenshot: {
      src: '/how-it-works-log-workout.png',
      alt: 'LFG add workout sheet with manual workout, wearable sync, and create challenge actions',
      width: 590,
      height: 1278,
    },
    metrics: [
      { label: 'Taps', value: '3' },
      { label: 'Sync', value: 'On' },
      { label: 'Manual', value: 'Backup' },
    ],
    flow: [
      {
        label: 'Sync',
        title: 'Wearable finds the workout',
        description: 'Completed sessions are ready to import from the devices people already use.',
        icon: Watch,
      },
      {
        label: 'Review',
        title: 'Confirm the activity',
        description: 'Tap the synced workout, check the basics, and see the points it will add.',
        icon: CheckCircle2,
      },
      {
        label: 'Fallback',
        title: 'Manual is still there',
        description: 'No wearable required. People can still add a workout when they need to.',
        icon: Dumbbell,
      },
    ],
  },
  {
    id: 'score',
    title: 'Fitness Score',
    tabLabel: 'Score',
    description: 'Walks, lifting, sport, HIIT, and any exercise can count. LFG turns different activity types into one effort score, so whoever works hardest earns the most points.',
    icon: Gauge,
    visualLabel: 'Any activity counts',
    badge: 'Effort into points',
    screenshot: {
      src: '/features-fitness-score.png',
      alt: 'LFG fitness score challenge chart and individual leaderboard screen',
      width: 376,
      height: 778,
    },
    metrics: [
      { label: 'Activities', value: 'All' },
      { label: 'Score', value: '4,775' },
      { label: 'Effort', value: '+115' },
    ],
    flow: [
      {
        label: 'Activity',
        title: 'Do any kind of exercise',
        description: 'Running, lifting, walking, sport, HIIT, and recovery can all move the challenge.',
        icon: Activity,
      },
      {
        label: 'Quantify',
        title: 'Turn effort into points',
        description: 'Different workouts are translated into one comparable fitness score.',
        icon: Gauge,
      },
      {
        label: 'Compare',
        title: 'Hard work rises',
        description: 'The leaderboard rewards the person putting in the most work, not just one type of athlete.',
        icon: BarChart3,
      },
    ],
  },
  {
    id: 'leaderboards',
    title: 'Leaderboards And Teams',
    tabLabel: 'Leaderboard',
    description: 'Run free-for-all challenges to find the best of the best, or team challenges where everyone can contribute even if they are not the top individual.',
    icon: Trophy,
    visualLabel: 'Challenge modes',
    badge: 'Team or free-for-all',
    screenshot: {
      src: '/features-teams-leaderboard.png',
      alt: 'LFG team challenge leaderboard with team stats and recent activity',
      width: 376,
      height: 780,
    },
    metrics: [
      { label: 'Modes', value: '2' },
      { label: 'Teams', value: '4' },
      { label: 'FFA', value: 'On' },
    ],
    flow: [
      {
        label: 'Choose',
        title: 'Pick the challenge style',
        description: 'Teams for group contribution, or free-for-all when everyone wants the full race.',
        icon: UsersRound,
      },
      {
        label: 'Team',
        title: 'Everyone can help',
        description: 'Smaller contributions still matter because they add to the team total.',
        icon: Medal,
      },
      {
        label: 'Free for all',
        title: 'Best of the best',
        description: 'The individual leaderboard shows who is putting in the most work.',
        icon: Trophy,
      },
    ],
  },
  {
    id: 'updates',
    title: 'Friend Motivation',
    tabLabel: 'Motivation',
    description: 'Real-time notifications show when friends work out, climb the board, or keep moving, so the group keeps each other accountable.',
    icon: Bell,
    visualLabel: 'Real-time motivation',
    badge: 'Friend worked out',
    screenshot: {
      src: '/features-friend-motivation.png',
      alt: 'LFG friend workout notifications on a phone lock screen',
      width: 466,
      height: 874,
    },
    metrics: [
      { label: 'Alerts', value: 'Live' },
      { label: 'Friends', value: '8' },
      { label: 'Nudge', value: 'Now' },
    ],
    flow: [
      {
        label: 'Notify',
        title: 'A friend works out',
        description: 'You see it as it happens, while there is still time to respond.',
        icon: Bell,
      },
      {
        label: 'Nudge',
        title: 'Accountability kicks in',
        description: 'The notification turns their activity into a prompt for you to move.',
        icon: MessageCircle,
      },
      {
        label: 'Move',
        title: 'Motivation stays high',
        description: 'Friend activity keeps the challenge active instead of letting it go quiet.',
        icon: Flame,
      },
    ],
  },
];

const visualRenderers: Record<FeatureId, ComponentType<{ feature: Feature }>> = {
  logging: LoggingVisual,
  score: ScoreVisual,
  leaderboards: LeaderboardVisual,
  updates: UpdatesVisual,
};

const phoneScreenAspectRatio = '590 / 1278';

const screenshotScreenClasses: Partial<Record<FeatureId, string>> = {
  score: 'origin-top scale-[1.055]',
  leaderboards: 'origin-top scale-[1.055]',
  updates: 'object-center',
};

export default function Features() {
  const [activeFeatureId, setActiveFeatureId] = useState<FeatureId>('logging');
  const activeFeature = features.find((feature) => feature.id === activeFeatureId) ?? features[0];

  return (
    <section className="relative isolate overflow-x-clip bg-[linear-gradient(180deg,#effcff_0%,#ffffff_34rem,#ffffff_100%)] px-4 pb-20 pt-[calc(7rem+env(safe-area-inset-top))] sm:px-6 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-36">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-[calc(8rem+env(safe-area-inset-top))] -z-10 h-[42rem] bg-[radial-gradient(ellipse_at_top,rgba(0,234,255,0.24),rgba(255,255,255,0)_70%)]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 h-80 w-[min(58rem,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,204,0,0.18),transparent_68%)] blur-2xl"
      />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="bg-[linear-gradient(135deg,#0091FF,#00EAFF,#FFCC00)] bg-clip-text text-sm font-semibold uppercase tracking-[0.2em] text-transparent">
            Features
          </p>
          <h1 className="mt-4 text-balance text-4xl font-medium tracking-normal text-gray-950 sm:text-5xl md:text-6xl">
            Social fitness features that keep friends moving
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-gray-600">
            LFG turns workouts into shared challenges, visible points, and live updates so people can stay accountable together.
          </p>
        </div>

        <MobileFeatureList />

        <div className="mt-12 hidden min-w-0 gap-8 lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <FeatureTabs activeFeatureId={activeFeatureId} onSelect={setActiveFeatureId} />
          <FeatureCanvas feature={activeFeature} />
        </div>
      </div>
    </section>
  );
}

function MobileFeatureList() {
  return (
    <div className="mt-10 space-y-7 lg:hidden">
      {features.map((feature) => (
        <MobileFeatureSection key={feature.id} feature={feature} />
      ))}
    </div>
  );
}

function MobileFeatureSection({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const Visual = visualRenderers[feature.id];

  return (
    <article className="relative isolate min-w-0 max-w-full overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-white/88 p-3 shadow-[0_30px_90px_-58px_rgba(15,23,42,0.65)] backdrop-blur sm:p-6">
      <div
        aria-hidden
        className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-[#00EAFF]/15 blur-3xl"
      />

      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#00EAFF]/45 bg-white text-[#0091FF] shadow-[0_18px_40px_-30px_rgba(0,145,255,0.78)]">
          <Icon className="h-6 w-6" strokeWidth={1.9} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">{feature.visualLabel}</p>
          <h2 className="mt-2 text-[1.65rem] font-medium leading-tight text-gray-950">{feature.title}</h2>
          <p className="mt-3 text-pretty text-sm leading-6 text-gray-600">{feature.description}</p>
        </div>
      </div>

      <div className="mt-5 flex min-w-0 justify-center">
        <Visual feature={feature} />
      </div>

      <div className="mt-4 space-y-2.5">
        {feature.flow.map((step, index) => (
          <div key={step.label} className="relative">
            <FlowNode step={step} index={index} />
            {index < feature.flow.length - 1 && (
              <span
                aria-hidden
                className="absolute left-8 top-full h-2.5 w-px bg-gradient-to-b from-[#00EAFF]/70 to-[#0091FF]/35"
              />
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

function FeatureTabs({
  activeFeatureId,
  onSelect,
}: {
  activeFeatureId: FeatureId;
  onSelect: (featureId: FeatureId) => void;
}) {
  return (
    <div className="relative min-w-0 lg:sticky lg:top-28">
      <div
        aria-hidden
        className="absolute bottom-4 left-0 top-4 hidden w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent lg:block"
      />
      <div
        role="tablist"
        aria-label="LFG features"
        className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:block lg:space-y-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          const isActive = feature.id === activeFeatureId;

          return (
            <button
              key={feature.id}
              id={`feature-tab-${feature.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`feature-panel-${feature.id}`}
              onClick={() => onSelect(feature.id)}
              className={cn(
                'group relative min-w-[7.25rem] flex-1 snap-start rounded-2xl border bg-white/86 p-3 text-left shadow-[0_18px_55px_-44px_rgba(15,23,42,0.55)] backdrop-blur transition-all duration-300 lg:w-full lg:min-w-0 lg:p-5',
                'hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_24px_64px_-48px_rgba(15,23,42,0.68)]',
                isActive
                  ? 'border-transparent bg-[linear-gradient(135deg,rgba(0,145,255,0.08),rgba(0,234,255,0.08)_38%,rgba(255,255,255,0.95)_70%)] shadow-[0_28px_70px_-48px_rgba(0,145,255,0.72)]'
                  : 'border-gray-200/80'
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'absolute -left-px top-5 hidden h-16 w-1 rounded-full bg-[linear-gradient(180deg,#0091FF,#00EAFF,#FFCC00)] opacity-0 transition-opacity lg:block',
                  isActive && 'opacity-100'
                )}
              />
              <span className="flex items-center gap-3 lg:items-start lg:gap-4">
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors lg:h-11 lg:w-11',
                    isActive
                      ? 'border-[#00EAFF]/55 bg-white text-[#0091FF] shadow-[0_14px_32px_-24px_rgba(0,145,255,0.72)]'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-5 text-gray-950 lg:text-base lg:leading-6">
                    <span className="lg:hidden">{feature.tabLabel}</span>
                    <span className="hidden lg:inline">{feature.title}</span>
                  </span>
                  <span className="hidden text-sm leading-6 text-gray-600 lg:mt-2 lg:block">{feature.description}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeatureCanvas({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const Visual = visualRenderers[feature.id];

  return (
    <div
      id={`feature-panel-${feature.id}`}
      role="tabpanel"
      aria-labelledby={`feature-tab-${feature.id}`}
      className="relative isolate min-w-0 max-w-full overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-white/88 p-3 shadow-[0_30px_90px_-58px_rgba(15,23,42,0.65)] backdrop-blur sm:p-6"
    >
      <div
        aria-hidden
        className="absolute inset-x-8 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white to-transparent"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-[#00EAFF]/15 blur-3xl"
      />

      <div key={feature.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500 motion-reduce:animate-none">
        <div className="flex min-w-0 flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#00EAFF]/45 bg-white text-[#0091FF] shadow-[0_18px_40px_-30px_rgba(0,145,255,0.78)] sm:h-12 sm:w-12">
              <Icon className="h-6 w-6" strokeWidth={1.9} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">{feature.visualLabel}</p>
              <h2 className="mt-2 max-w-full text-pretty text-[1.65rem] font-medium leading-tight text-gray-950 sm:text-3xl">{feature.title}</h2>
            </div>
          </div>

          <div className="hidden grid-cols-3 gap-2 sm:grid sm:w-fit">
            {feature.metrics.map((metric) => (
              <div
                key={metric.label}
                className="min-w-0 rounded-2xl border border-gray-200/80 bg-white/80 px-3 py-2 text-center shadow-[0_14px_34px_-30px_rgba(15,23,42,0.48)]"
              >
                <p className="truncate text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-500">{metric.label}</p>
                <p className="mt-1 text-lg font-semibold leading-none text-gray-950">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid min-w-0 gap-4 sm:mt-7 sm:gap-5 xl:grid-cols-[0.84fr_1.16fr]">
          <div className="order-2 space-y-2.5 sm:space-y-3 xl:order-1">
            {feature.flow.map((step, index) => (
              <div key={step.label} className="relative">
                <FlowNode step={step} index={index} />
                {index < feature.flow.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-10 top-full h-3 w-px bg-gradient-to-b from-[#00EAFF]/70 to-[#0091FF]/35"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="order-1 flex min-w-0 justify-center xl:order-2">
            <Visual feature={feature} />
          </div>
        </div>
      </div>
    </div>
  );
}

const flowIconTreatments = [
  {
    frame: 'bg-[linear-gradient(135deg,#FFFFFF_0%,#FFF4A3_42%,#FFD735_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_34px_-24px_rgba(255,215,53,0.7)]',
    surface: 'bg-[linear-gradient(135deg,#FFFFFF_0%,#FFF9D8_44%,#FFD735_100%)]',
    icon: 'text-[#1f2937]',
  },
  {
    frame: 'bg-[linear-gradient(135deg,#FFFFFF_0%,#00EAFF_38%,#0091FF_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.68),0_14px_34px_-24px_rgba(0,145,255,0.82)]',
    surface: 'bg-[linear-gradient(135deg,#0091FF_0%,#00BFFF_48%,#00EAFF_100%)]',
    icon: 'text-white',
  },
  {
    frame: 'bg-[linear-gradient(135deg,#FFFFFF_0%,#9A9A9A_42%,#000000_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_34px_-24px_rgba(0,0,0,0.7)]',
    surface: 'bg-[linear-gradient(135deg,#000000_0%,#333333_48%,#9A9A9A_100%)]',
    icon: 'text-white',
  },
] as const;

function FlowNode({
  step,
  index,
}: {
  step: Feature['flow'][number];
  index: number;
}) {
  const Icon = step.icon;
  const iconTreatment = flowIconTreatments[index % flowIconTreatments.length];

  return (
    <article className="relative z-10 overflow-hidden rounded-2xl border border-white/65 bg-white/52 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.94),inset_0_-1px_0_rgba(255,255,255,0.52),0_20px_52px_-38px_rgba(15,23,42,0.72),0_10px_30px_-24px_rgba(0,145,255,0.5)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.86),transparent_34%),linear-gradient(135deg,rgba(0,145,255,0.1),rgba(0,234,255,0.08)_42%,rgba(255,204,0,0.08)_100%)] before:opacity-95 after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,transparent_28%,rgba(255,255,255,0.18)_100%)] sm:p-4">
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="relative flex gap-3 sm:gap-4">
        <div className={cn('h-10 w-10 shrink-0 rounded-xl p-[1px] sm:h-12 sm:w-12', iconTreatment.frame)}>
          <div className={cn('relative flex h-full w-full items-center justify-center overflow-hidden rounded-[0.7rem] sm:rounded-[0.8rem]', iconTreatment.surface)}>
            <span
              aria-hidden
              className="absolute inset-x-1 top-1 h-1/2 rounded-full bg-white/28 blur-sm"
            />
            <Icon className={cn('relative h-5 w-5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.16)]', iconTreatment.icon)} strokeWidth={2.05} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gray-500">
            {String(index + 1).padStart(2, '0')} / {step.label}
          </p>
          <h3 className="mt-1 text-sm font-semibold leading-5 text-gray-950 sm:text-base sm:leading-6">{step.title}</h3>
          <p className="mt-1 hidden text-sm leading-6 text-gray-600 sm:block">{step.description}</p>
        </div>
      </div>
    </article>
  );
}

function VisualStage({ feature, children }: { feature: Feature; children: ReactNode }) {
  return (
    <div
      aria-label={feature.visualLabel}
      className="relative mx-auto min-h-[430px] w-full max-w-[min(22rem,calc(100vw-4rem))] overflow-hidden rounded-[1.4rem] border border-gray-200/80 bg-white/82 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:min-h-[520px] sm:max-w-none sm:p-6"
    >
      <svg
        aria-hidden
        className="absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 760 520"
        preserveAspectRatio="none"
      >
        <path
          d="M164 112 C252 112 275 206 338 206"
          fill="none"
          stroke="url(#feature-line-a)"
          strokeDasharray="6 8"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M424 204 C504 194 520 126 596 126"
          fill="none"
          stroke="url(#feature-line-b)"
          strokeDasharray="6 8"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M394 328 C332 392 260 410 166 410"
          fill="none"
          stroke="url(#feature-line-c)"
          strokeDasharray="6 8"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="feature-line-a" x1="164" x2="338" y1="112" y2="206" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0091FF" stopOpacity="0.18" />
            <stop offset="1" stopColor="#00EAFF" stopOpacity="0.62" />
          </linearGradient>
          <linearGradient id="feature-line-b" x1="424" x2="596" y1="204" y2="126" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00EAFF" stopOpacity="0.62" />
            <stop offset="1" stopColor="#FFCC00" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="feature-line-c" x1="394" x2="166" y1="328" y2="410" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0091FF" stopOpacity="0.46" />
            <stop offset="1" stopColor="#FFCC00" stopOpacity="0.42" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 flex min-h-[404px] min-w-0 items-center justify-center py-4 sm:min-h-[488px] sm:py-6">
        {children}
      </div>
    </div>
  );
}

function LoggingVisual({ feature }: { feature: Feature }) {
  return (
    <VisualStage feature={feature}>
      <PhoneFrame>
        <ScreenshotScreen screenshot={feature.screenshot} featureId={feature.id} />
      </PhoneFrame>
    </VisualStage>
  );
}

function ScoreVisual({ feature }: { feature: Feature }) {
  return (
    <VisualStage feature={feature}>
      <PhoneFrame>
        <ScreenshotScreen screenshot={feature.screenshot} featureId={feature.id} />
      </PhoneFrame>
    </VisualStage>
  );
}

function LeaderboardVisual({ feature }: { feature: Feature }) {
  return (
    <VisualStage feature={feature}>
      <PhoneFrame>
        <ScreenshotScreen screenshot={feature.screenshot} featureId={feature.id} />
      </PhoneFrame>
    </VisualStage>
  );
}

function UpdatesVisual({ feature }: { feature: Feature }) {
  return (
    <VisualStage feature={feature}>
      <PhoneFrame>
        <ScreenshotScreen screenshot={feature.screenshot} featureId={feature.id} />
      </PhoneFrame>
    </VisualStage>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="leaderboard-phone-glow relative isolate mx-auto w-[206px] max-w-[calc(100vw-6rem)] sm:w-[270px] sm:max-w-full lg:w-[292px]">
      <div className="relative rounded-[32px] border-[7px] border-gray-950 bg-gray-950 shadow-2xl shadow-gray-900/20 sm:rounded-[34px] sm:border-[8px]">
        <div className="pointer-events-none absolute inset-0 rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_55px_-34px_rgba(0,145,255,0.68),0_24px_70px_-42px_rgba(0,234,255,0.52),0_22px_62px_-48px_rgba(255,204,0,0.42)] sm:rounded-[26px]" />
        <div className="absolute left-1/2 top-2 z-20 h-4 w-14 -translate-x-1/2 rounded-full bg-black sm:h-5 sm:w-16" />
        <div className="overflow-hidden rounded-[23px] bg-white sm:rounded-[25px]">{children}</div>
      </div>
    </div>
  );
}

function ScreenshotScreen({ screenshot, featureId }: { screenshot?: Screenshot; featureId: FeatureId }) {
  if (!screenshot) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: phoneScreenAspectRatio }}>
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 292px, (min-width: 640px) 270px, 206px"
        className={cn('select-none object-cover object-top', screenshotScreenClasses[featureId])}
      />
    </div>
  );
}
