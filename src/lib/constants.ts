import { resolveInviteConfig } from "./inviteConfig.mjs";
export const INVITE_CONFIG = resolveInviteConfig({
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_SCHEME: process.env.NEXT_PUBLIC_APP_SCHEME,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_APP_STORE_URL: process.env.NEXT_PUBLIC_APP_STORE_URL,
  NEXT_PUBLIC_PLAY_STORE_URL: process.env.NEXT_PUBLIC_PLAY_STORE_URL,
});
export const APP_SCHEME = INVITE_CONFIG.scheme;
export const APP_STORE_URL = INVITE_CONFIG.appStore;
export const PLAY_STORE_URL = INVITE_CONFIG.playStore;
