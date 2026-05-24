'use client';

import { cn } from '@/lib/utils';
import { Dumbbell, PlusCircle, Trophy, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const steps: Step[] = [
  {
    title: 'Create or join a challenge',
    description: 'Create or join a challenge and then invite your friends to get started.',
    icon: PlusCircle,
    image: {
      src: '/how-it-works-create-or-join.png',
      alt: 'LFG challenge leaderboard screen',
      width: 590,
      height: 1278,
    },
  },
  {
    title: 'Log a workout',
    description: 'Log your workout manually or with any wearable device with just a single button tap.',
    icon: Dumbbell,
    image: {
      src: '/how-it-works-log-workout.png',
      alt: 'LFG workout action sheet screen',
      width: 590,
      height: 1278,
    },
  },
  {
    title: 'Climb the leaderboard',
    description: "Get points from your workouts to see who's putting in the most effort.",
    icon: Trophy,
    image: {
      src: '/how-it-works-leaderboard.jpg',
      alt: 'LFG challenge leaderboard podium screen',
      width: 946,
      height: 2047,
    },
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const active = steps[activeStep];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const carousel = mobileCarouselRef.current;
    const card = carousel?.children.item(activeStep) as HTMLElement | null;

    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeStep]);

  return (
    <section id="how-it-works" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-medium text-gray-950 sm:text-5xl md:text-6xl">
            How It Works
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg">
            Start a challenge, record the work, and let LFG keep the competition clear as the leaderboard updates.
          </p>
        </div>

        <div className="mt-16 hidden grid-cols-[0.92fr_1.08fr] items-center gap-10 md:grid lg:gap-14">
          <div className="self-center space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;

              return (
                <button
                  key={step.title}
                  type="button"
                  aria-pressed={isActive}
                  data-active={isActive ? 'true' : undefined}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    'group relative isolate w-full overflow-hidden rounded-[1.4rem] border bg-white p-[1px] text-left shadow-[0_22px_70px_-48px_rgba(15,23,42,0.58)] transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[linear-gradient(135deg,rgba(0,145,255,0.16)_0%,rgba(0,234,255,0.13)_18%,rgba(255,255,255,0.96)_46%,rgba(255,255,255,1)_100%)] after:pointer-events-none after:absolute after:inset-x-8 after:top-0 after:z-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent',
                    isActive
                      ? 'border-transparent before:bg-[linear-gradient(135deg,#0091FF,#00EAFF)] shadow-[0_28px_90px_-50px_rgba(0,145,255,0.68),0_20px_70px_-55px_rgba(0,234,255,0.55)]'
                      : 'border-gray-200/80 text-gray-950 hover:border-gray-300 hover:shadow-[0_26px_76px_-54px_rgba(15,23,42,0.65)]'
                  )}
                >
                  <div
                    className={cn(
                      'relative z-10 overflow-hidden rounded-[1.32rem] bg-white/95 p-6 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(0,145,255,0.12)_0%,rgba(0,234,255,0.1)_22%,rgba(255,255,255,0.82)_52%,transparent_78%)]',
                      isActive && 'bg-[linear-gradient(135deg,rgba(0,145,255,0.1)_0%,rgba(0,234,255,0.09)_18%,#ffffff_46%,#ffffff_100%)]'
                    )}
                  >
                    <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#00EAFF]/25 opacity-0 blur-3xl transition-opacity duration-300 group-data-[active=true]:opacity-100" />
                    <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <div className="relative flex items-stretch gap-6">
                      <div
                        className={cn(
                          'flex min-h-[128px] w-28 shrink-0 items-center justify-center rounded-2xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300',
                          isActive
                            ? 'border-[#00EAFF]/55 bg-[linear-gradient(135deg,rgba(0,145,255,0.08)_0%,rgba(0,234,255,0.08)_22%,#ffffff_62%,#ffffff_100%)] text-[#0091FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_16px_38px_-28px_rgba(0,145,255,0.78)]'
                            : 'border-gray-200 bg-[linear-gradient(135deg,#ffffff,#f8fafc)] text-gray-950'
                        )}
                      >
                        <Icon className="h-10 w-10" strokeWidth={1.8} />
                      </div>
                      <div className="flex min-h-[128px] flex-1 flex-col justify-center">
                        <p
                          className={cn(
                            'text-[0.68rem] font-medium uppercase tracking-[0.24em]',
                            isActive ? 'bg-[linear-gradient(135deg,#0091FF,#00EAFF)] bg-clip-text text-transparent' : 'text-gray-500'
                          )}
                        >
                          Step {index + 1}
                        </p>
                        <h3 className="mt-2 text-2xl font-medium leading-tight tracking-normal text-gray-950">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex min-h-[560px] items-center justify-center">
            <div className="flex h-full items-center justify-center">
              <StepVisual step={active} priority />
            </div>
          </div>
        </div>

        <div className="mt-10 md:hidden">
          <div
            ref={mobileCarouselRef}
            aria-label="How it works steps"
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(event) => {
              const carousel = event.currentTarget;
              const card = carousel.firstElementChild as HTMLElement | null;
              const stepWidth = card ? card.offsetWidth + 16 : carousel.clientWidth;
              const nextStep = Math.round(carousel.scrollLeft / stepWidth);

              if (nextStep !== activeStep && nextStep >= 0 && nextStep < steps.length) {
                setActiveStep(nextStep);
              }
            }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isMobileActive = index === activeStep;

              return (
                <article
                  key={step.title}
                  className="relative isolate min-w-[calc(100vw-2rem)] snap-center overflow-hidden rounded-[1.4rem] border border-gray-200/80 bg-white p-[1px] shadow-[0_18px_44px_-38px_rgba(15,23,42,0.42)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(0,145,255,0.15)_0%,rgba(0,234,255,0.12)_18%,rgba(255,255,255,0.96)_48%,rgba(255,255,255,1)_100%)]"
                >
                  <svg
                    key={isMobileActive ? 'active-progress-' + index : 'inactive-progress-' + index}
                    viewBox="0 0 32 32"
                    className="pointer-events-none absolute right-4 top-4 z-20 h-8 w-8 -rotate-90"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id={'mobile-step-progress-' + index} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0091FF" />
                        <stop offset="0.45" stopColor="#00EAFF" />
                        <stop offset="0.72" stopColor="#FFFBEA" />
                        <stop offset="1" stopColor="#FFCC00" />
                      </linearGradient>
                    </defs>
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      className={cn(isMobileActive && 'mobile-step-progress-ring')}
                      cx="16"
                      cy="16"
                      r="12"
                      fill="none"
                      stroke={'url(#mobile-step-progress-' + index + ')'}
                      strokeLinecap="round"
                      strokeWidth="3"
                      strokeDasharray="75.4"
                      strokeDashoffset={isMobileActive ? 75.4 : 0}
                    />
                  </svg>
                  <div className="relative z-10 overflow-hidden rounded-[1.32rem] bg-white/95 p-5 pr-12 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(0,145,255,0.11)_0%,rgba(0,234,255,0.1)_22%,rgba(255,255,255,0.84)_54%,transparent_80%)]">
                    <div className="relative flex items-start gap-3.5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#00EAFF]/45 bg-[linear-gradient(135deg,rgba(0,145,255,0.07)_0%,rgba(0,234,255,0.08)_22%,#ffffff_62%,#f8fafc_100%)] text-[#0091FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_34px_-30px_rgba(0,145,255,0.6)]">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0 flex-1 pt-1">
                        <p className="bg-[linear-gradient(135deg,#0091FF,#00EAFF)] bg-clip-text text-[0.68rem] font-medium uppercase tracking-[0.24em] text-transparent">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-2 text-2xl font-medium leading-tight tracking-normal text-gray-950">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    <div className="relative mt-6 flex justify-center overflow-hidden pb-2">
                      <StepVisual step={step} compactGlow />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-1 flex justify-center gap-2" aria-hidden>
            {steps.map((step) => (
              <span key={step.title} className="h-2 w-2 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepVisual({
  step,
  priority = false,
  compactGlow = false,
}: {
  step: Step;
  priority?: boolean;
  compactGlow?: boolean;
}) {
  return (
    <PhoneFrame compactGlow={compactGlow}>
      <Image
        src={step.image.src}
        alt={step.image.alt}
        width={step.image.width}
        height={step.image.height}
        priority={priority}
        unoptimized
        sizes="(min-width: 1024px) 300px, 280px"
        className="h-auto w-full select-none brightness-[1.03] contrast-[1.04] saturate-[1.08]"
      />
    </PhoneFrame>
  );
}

function PhoneFrame({ children, compactGlow = false }: { children: ReactNode; compactGlow?: boolean }) {
  return (
    <div className={cn('leaderboard-phone-glow relative isolate w-full max-w-[280px] lg:max-w-[300px]', compactGlow && 'leaderboard-phone-glow--compact')}>
      <div
        className={cn(
          'relative rounded-[38px] border-[9px] border-gray-950 bg-gray-950',
          compactGlow ? 'shadow-[0_18px_44px_-40px_rgba(0,145,255,0.52)]' : 'shadow-2xl shadow-gray-900/20'
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[29px]',
            compactGlow
              ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_12px_34px_-30px_rgba(0,145,255,0.48),0_14px_38px_-34px_rgba(0,234,255,0.36)]'
              : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_18px_55px_-34px_rgba(0,145,255,0.68),0_24px_70px_-42px_rgba(0,234,255,0.52),0_22px_62px_-48px_rgba(255,204,0,0.42)]'
          )}
        />
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[28px] bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
