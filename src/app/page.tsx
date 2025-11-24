import { HeroSection } from '@/components/marketing/Hero';
import { BackgroundPaths } from '@/components/ui/background-paths';
import AppStoreButtons from '@/components/AppStoreButtons';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BackgroundPaths title="Lets Fit Go!">
        <AppStoreButtons />
      </BackgroundPaths>
    </>
  );
}
