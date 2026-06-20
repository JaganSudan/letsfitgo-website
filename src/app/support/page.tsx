import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Mail, Phone, ShieldAlert, Smartphone, UserX, Watch } from "lucide-react";

const supportEmail = "jagan.sudan@letsfitgo.com";
const supportPhone = "02040052976";

const supportTopics = [
  {
    title: "Account and data deletion",
    description:
      "Ask for help accessing your account, deleting your account, or removing personal data associated with LFG.",
    icon: UserX,
  },
  {
    title: "Wearable sync issues",
    description:
      "Get help with Apple Health, Apple Watch, Garmin, Fitbit, Whoop, or workouts that are not syncing as expected.",
    icon: Watch,
  },
  {
    title: "Workouts and points",
    description:
      "Report missing workouts, incorrect points, leaderboard problems, or challenge progress that does not look right.",
    icon: Smartphone,
  },
  {
    title: "Invites and friends",
    description:
      "Get help joining a challenge, inviting friends, finding contacts, or fixing a challenge invite link.",
    icon: Mail,
  },
  {
    title: "Safety and abuse reports",
    description:
      "Report inappropriate content, abusive behavior, impersonation, harassment, or another safety concern.",
    icon: ShieldAlert,
  },
  {
    title: "Other app support",
    description:
      "Send any other issue that is stopping you from using Let's Fit Go, including crashes or login problems.",
    icon: AlertTriangle,
  },
];

export const metadata: Metadata = {
  title: "Support",
  description:
    "Contact Let's Fit Go support for help with your account, workouts, wearable sync, challenges, invites, privacy, or safety reports.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-[#f8fbff] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm font-medium text-[#0070c9] hover:text-gray-950">
            Back to home
          </Link>
          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0070c9]">LFG support</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-gray-950 md:text-5xl">
              Contact Let&apos;s Fit Go support
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Need help with your account, workouts, challenge progress, wearable sync, invites, or a safety concern?
              Contact us directly and include enough detail for us to investigate.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href={`mailto:${supportEmail}`}
              className="flex min-h-24 items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-[#9adfff]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#e9f7ff] text-[#0070c9]">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-950">Email support</span>
                <span className="mt-1 block text-sm text-gray-600">{supportEmail}</span>
              </span>
            </a>
            <a
              href={`tel:${supportPhone}`}
              className="flex min-h-24 items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-[#9adfff]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#e9f7ff] text-[#0070c9]">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-950">Phone</span>
                <span className="mt-1 block text-sm text-gray-600">{supportPhone}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0070c9]">What to include</p>
            <h2 className="mt-3 text-3xl font-medium tracking-normal text-gray-950">Help us find the issue faster</h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              When you contact support, include your account email, device and platform, the challenge name if relevant,
              what you expected to happen, and what actually happened.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm">
              <Link
                href="/docs"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-gray-200 px-4 font-semibold text-gray-700 transition-colors hover:border-[#9adfff] hover:text-gray-950"
              >
                Read docs
              </Link>
              <Link
                href="/privacy"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-gray-200 px-4 font-semibold text-gray-700 transition-colors hover:border-[#9adfff] hover:text-gray-950"
              >
                Privacy policy
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {supportTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <article key={topic.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#e9f7ff] text-[#0070c9]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-gray-950">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{topic.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
