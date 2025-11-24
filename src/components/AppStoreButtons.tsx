import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/constants';

export default function AppStoreButtons() {
  const appStoreUrl = APP_STORE_URL || '#';
  const playStoreUrl = PLAY_STORE_URL || '#';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <img
          src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
          alt="Download on the App Store"
          className="h-[50px] w-auto"
        />
      </a>
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <img
          src="/GetItOnGooglePlay_Badge_Web_color_English.svg"
          alt="Get it on Google Play"
          className="h-[50px] w-auto"
        />
      </a>
    </div>
  );
}

