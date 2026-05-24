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
      <div className="bg-white py-6 text-center">
        <Link href="/privacy" className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
          Privacy Policy
        </Link>
      </div>
    </>
  );
}
