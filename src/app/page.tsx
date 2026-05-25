import { HeroSection } from '@/components/marketing/Hero';
import HowItWorks from '@/components/marketing/HowItWorks';
import { BackgroundPaths } from '@/components/ui/background-paths';
import AppStoreButtons from '@/components/AppStoreButtons';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <div id="download">
        <BackgroundPaths title="Lets Fit Go!">
          <AppStoreButtons />
        </BackgroundPaths>
      </div>
      <div className="bg-white py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/docs" className="text-gray-500 hover:text-gray-700 transition-colors">
            Docs
          </Link>
          <Link href="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </>
  );
}
