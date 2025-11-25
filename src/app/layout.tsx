import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://letsfitgo.com'),
  title: {
    default: "Let's Fit Go - Fitness Challenges with Friends",
    template: "%s | Let's Fit Go",
  },
  description: "Challenge friends to fitness competitions, track your workouts, and climb the leaderboard. Let's Fit Go makes staying fit fun and social. Download the free app today!",
  keywords: ["fitness app", "workout challenges", "fitness with friends", "workout tracker", "fitness competition", "social fitness", "gym motivation", "fitness leaderboard", "workout accountability"],
  authors: [{ name: "Let's Fit Go" }],
  creator: "Let's Fit Go",
  publisher: "Let's Fit Go",
  icons: {
    icon: "/lfgappicon.png",
    apple: "/lfgappicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://letsfitgo.com",
    siteName: "Let's Fit Go",
    title: "Let's Fit Go - Fitness Challenges with Friends",
    description: "Challenge friends to fitness competitions, track your workouts, and climb the leaderboard. Make fitness fun and social!",
    images: [
      {
        url: "/lfgappicon.png",
        width: 512,
        height: 512,
        alt: "Let's Fit Go App Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Fit Go - Fitness Challenges with Friends",
    description: "Challenge friends to fitness competitions, track your workouts, and climb the leaderboard!",
    images: ["/lfgappicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

