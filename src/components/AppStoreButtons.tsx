import { APP_STORE_URL, PLAY_STORE_URL, INVITE_CONFIG } from '@/lib/constants';

export default function AppStoreButtons() {
  const appStoreUrl = APP_STORE_URL;
  const playStoreUrl = PLAY_STORE_URL;

  if (INVITE_CONFIG.environment === 'preview') {
    return (
      <div className="space-y-3 text-center">
        <a
          href={appStoreUrl || "https://apps.apple.com/app/testflight/id899247664"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
        >
          {appStoreUrl ? "Install LFG Preview with TestFlight" : "Get TestFlight"}
        </a>
        <p className="text-sm text-gray-600">
          {appStoreUrl
            ? "Accept the beta invitation in TestFlight, then install LFG Preview."
            : "Already a tester? Open TestFlight and install LFG Preview. If it is missing, accept your tester invitation or contact the test owner."}
        </p>
        {playStoreUrl && <a className="block text-blue-700 underline" href={playStoreUrl} rel="noreferrer">Install LFG Preview for Android</a>}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {appStoreUrl && <a
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
      </a>}
      {playStoreUrl && <a
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
      </a>}
      {!appStoreUrl && !playStoreUrl && <p>Preview installation links are not configured. Contact the test owner.</p>}
    </div>
  );
}

