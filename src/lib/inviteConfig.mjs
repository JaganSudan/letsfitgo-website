const targets = {
  production: {
    api: "https://api.letsfitgo.com/api/v1",
    origins: [
      "https://go.letsfitgo.com",
      "https://letsfitgo.com",
      "https://www.letsfitgo.com",
    ],
    scheme: "lfg",
    package: "com.jagansudan.templfg",
  },
  preview: {
    api: "https://lfg-staging.up.railway.app/api/v1",
    origins: ["https://preview-invite.letsfitgo.com"],
    scheme: "lfg-preview",
    package: "com.jagansudan.templfg.preview",
  },
  development: {
    api: "https://lfg-staging.up.railway.app/api/v1",
    origins: ["https://dev-invite.letsfitgo.com"],
    scheme: "lfg-dev",
    package: "com.jagansudan.templfg.dev",
  },
};
export function resolveInviteConfig(env) {
  const target = targets[env.NEXT_PUBLIC_APP_ENV];
  if (!target)
    throw new Error(
      "NEXT_PUBLIC_APP_ENV must be production, preview, or development",
    );
  if (
    env.NEXT_PUBLIC_API_URL !== target.api ||
    env.NEXT_PUBLIC_APP_SCHEME !== target.scheme ||
    !target.origins.includes(env.NEXT_PUBLIC_SITE_URL)
  ) {
    throw new Error(
      "Invite API, scheme and HTTPS site origin must match the selected environment",
    );
  }
  const appStore = env.NEXT_PUBLIC_APP_STORE_URL || null;
  const playStore = env.NEXT_PUBLIC_PLAY_STORE_URL || null;
  if (appStore) {
    const u = new URL(appStore);
    if (
      u.protocol !== "https:" ||
      u.username ||
      u.password ||
      (env.NEXT_PUBLIC_APP_ENV === "production"
        ? u.host !== "apps.apple.com" || !u.pathname.endsWith("/id6754862826")
        : env.NEXT_PUBLIC_APP_ENV !== "preview" ||
          u.host !== "testflight.apple.com" ||
          !/^\/join\/[a-z0-9]+$/i.test(u.pathname))
    )
      throw new Error(
        "App install URL must target the selected app environment",
      );
  }
  if (playStore) {
    const u = new URL(playStore);
    if (
      u.protocol !== "https:" ||
      u.host !== "play.google.com" ||
      u.pathname !== "/store/apps/details" ||
      u.searchParams.get("id") !== target.package
    )
      throw new Error("Play install URL must target the selected package");
  }
  return {
    environment: env.NEXT_PUBLIC_APP_ENV,
    api: target.api,
    origin: env.NEXT_PUBLIC_SITE_URL,
    scheme: target.scheme,
    package: target.package,
    appStore,
    playStore,
  };
}
export function associationDocuments(config, env) {
  if (env.INVITE_ASSOCIATIONS_ENABLED !== "true") return null;
  if (
    !/^[A-Z0-9]{10}$/.test(env.INVITE_APPLE_APP_ID_PREFIX || "") ||
    !/^([A-F0-9]{2}:){31}[A-F0-9]{2}$/i.test(
      env.INVITE_ANDROID_CERT_SHA256 || "",
    )
  ) {
    throw new Error(
      "Association activation requires verified Apple application prefix and Android app-signing SHA256",
    );
  }
  return {
    apple: {
      applinks: {
        apps: [],
        details: [
          {
            appID: `${env.INVITE_APPLE_APP_ID_PREFIX}.${config.package}`,
            paths: ["/invite/*"],
          },
        ],
      },
    },
    android: [
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: config.package,
          sha256_cert_fingerprints: [env.INVITE_ANDROID_CERT_SHA256],
        },
      },
    ],
  };
}
