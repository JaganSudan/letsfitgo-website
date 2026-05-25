import type { Metadata } from 'next';
import type { Viewport } from 'next';
import Link from 'next/link';
import AppStoreButtons from '@/components/AppStoreButtons';
import Features from '@/components/marketing/Features';
import { HeroHeader } from '@/components/marketing/Hero';

export const metadata: Metadata = {
  title: 'Features',
  description:
    "Explore Let's Fit Go features for wearable-first workout logging, fitness score, team and free-for-all leaderboards, and friend motivation alerts.",
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function FeaturesPage() {
  return (
    <>
      <HeroHeader />
      <Features />
      <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-[linear-gradient(135deg,rgba(0,145,255,0.08),rgba(0,234,255,0.07)_38%,rgba(255,255,255,0.98)_70%)] px-6 py-10 text-center shadow-[0_24px_80px_-58px_rgba(15,23,42,0.64)] sm:px-10 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Start with friends</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-medium tracking-normal text-gray-950 sm:text-4xl">
            Create a challenge, log the work, and let the leaderboard do the rest.
          </h2>
          <div className="mt-8">
            <AppStoreButtons />
          </div>
          <Link href="/#how-it-works" className="mt-6 inline-flex text-sm font-medium text-gray-600 transition-colors hover:text-gray-950">
            See how it works
          </Link>
        </div>
      </section>
    </>
  );
}
