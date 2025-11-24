'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import AppStoreButtons from '@/components/AppStoreButtons';
import { FeatureSteps } from '@/components/ui/feature-section';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section>
          <div className="relative mx-auto max-w-6xl px-6 pt-32 lg:pb-16 lg:pt-48">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
              >
                <h1 className="text-balance text-4xl font-medium sm:text-5xl md:text-6xl">
                  Fitness Challenges with Friends
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg">
                  Challenge friends, track your progress, and stay motivated with Let&apos;s Fit Go. Join fitness challenges and achieve your goals together.
                </p>
                <div className="mt-12 mx-auto max-w-sm">
                  <AppStoreButtons />
                </div>
                <div
                  aria-hidden
                  className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left"
                >
                  <div className="bg-background border-border/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border p-2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                    <div className="relative h-96 overflow-hidden rounded-[1.5rem] border p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--border),var(--border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
                  </div>
                  <div className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                    <div className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
                      <AppComponent />
                      <div className="bg-muted rounded-[1rem] p-4 pb-16 dark:bg-white/5"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5" />
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
        <AppBenefits />
        <NotificationFeature />
      </main>
    </>
  );
}

const AppComponent = () => {
  return (
    <img 
      src="/app-screenshot.png" 
      alt="LFG App Screenshot"
      className="w-full h-auto rounded-[1rem] object-cover"
    />
  );
};

const menuItems = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Download', href: '#download' },
  { name: 'About', href: '#about' },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed group z-20 w-full px-2"
      >
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </Link>
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && 'lg:hidden')}
                >
                  <Link href="#download">
                    <span>Login</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled && 'lg:hidden')}
                >
                  <Link href="#download">
                    <span>Sign Up</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                >
                  <Link href="#download">
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const appBenefits = [
  { 
    step: 'Step 1', 
    title: 'Challenge Friends',
    content: 'Create fitness challenges and invite friends to compete together.',
    image: ''
  },
  { 
    step: 'Step 2',
    title: 'Track Progress',
    content: 'Log workouts, monitor your score, and watch your fitness improve daily.',
    image: ''
  },
  { 
    step: 'Step 3',
    title: 'Stay Motivated',
    content: 'Climb leaderboards, earn achievements, and celebrate wins with your crew.',
    image: ''
  },
];

const AppBenefits = () => {
  return (
    <section className="bg-background pb-8 md:pb-2">
      <FeatureSteps 
        features={appBenefits}
        title="Why Choose Let's Fit Go"
        autoPlayInterval={4000}
        staticImage="/exemplar lfg.png"
      />
    </section>
  );
};

const NotificationFeature = () => {
  return (
    <section className="bg-background pb-8 md:pb-2">
      <div className="p-8 md:p-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            {/* Image on LEFT */}
            <div className="order-1 md:order-1 relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg">
              <Image
                src="/notificationexample.png"
                alt="Push notifications example"
                className="w-full h-full object-contain"
                width={1000}
                height={800}
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background from-0% via-background/80 via-30% to-transparent" />
            </div>
            {/* Text on RIGHT */}
            <div className="order-2 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Know When Your Friends Are Working Out
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Get push notifications when friends in your challenges start or complete workouts. Stay connected and motivated with real-time updates that keep you in the loop and encourage you to stay active alongside your friends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Logo = ({ className }: { className?: string }) => {
  return (
    <img 
      src="/lfglogoblue.png" 
      alt="LFG Logo" 
      className={cn('h-8 w-auto', className)}
    />
  );
};
