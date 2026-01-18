import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Let's Fit Go - Learn how we collect, use, and protect your fitness data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Let&apos;s Fit Go (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using Let&apos;s Fit Go, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.1 Account Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Name and email address</li>
              <li>Profile information and preferences</li>
              <li>Account credentials (securely encrypted)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Fitness and Health Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you connect wearable devices or health platforms, we collect the following types of data:
            </p>
            
            <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Apple HealthKit / Apple Watch</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Activity data (steps, distance, active energy)</li>
              <li>Workout data (type, duration, calories burned)</li>
              <li>Heart rate data</li>
              <li>Other health metrics you authorize</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Garmin Connect</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Activity data (workouts, steps, distance, calories)</li>
              <li>Heart rate data</li>
              <li>Sleep data</li>
              <li>Stress and recovery metrics</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Fitbit</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Activity data (steps, distance, calories)</li>
              <li>Sleep data</li>
              <li>Heart rate data</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Whoop</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Strain data</li>
              <li>Recovery metrics</li>
              <li>Sleep data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 App Usage Data</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Challenge participation and progress</li>
              <li>Workout logs and entries</li>
              <li>Leaderboard rankings</li>
              <li>App interactions and preferences</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>To provide and maintain our fitness tracking and challenge services</li>
              <li>To sync your fitness data from connected wearable devices and health platforms</li>
              <li>To display your progress, rankings, and achievements in challenges</li>
              <li>To enable social features, including challenging friends and sharing progress</li>
              <li>To send push notifications about challenge updates and friend activities</li>
              <li>To improve our app and develop new features</li>
              <li>To provide customer support and respond to your inquiries</li>
              <li>To ensure the security and integrity of our services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your data is stored securely using industry-standard security measures:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Database:</strong> Data is stored in Supabase, a secure cloud database platform</li>
              <li><strong>Hosting:</strong> Our application infrastructure is hosted on Railway</li>
              <li><strong>Encryption:</strong> All data is encrypted in transit using HTTPS/TLS</li>
              <li><strong>Access Controls:</strong> Access to your data is restricted to authorized personnel only</li>
              <li><strong>Authentication:</strong> Secure authentication methods protect your account</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              While we implement robust security measures, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services and Integrations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our app integrates with the following third-party services to provide fitness tracking capabilities:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.1 Wearable Device Integrations</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Apple HealthKit:</strong> We access health and fitness data from your Apple devices. You control which data types to share through your iOS settings.</li>
              <li><strong>Garmin Connect:</strong> We access your Garmin activity, health, and wellness data through the Garmin Connect API. Your use of Garmin services is also subject to Garmin&apos;s Privacy Policy.</li>
              <li><strong>Fitbit:</strong> We access your Fitbit activity and health data. Your use of Fitbit services is also subject to Fitbit&apos;s Privacy Policy.</li>
              <li><strong>Whoop:</strong> We access your Whoop strain, recovery, and sleep data. Your use of Whoop services is also subject to Whoop&apos;s Privacy Policy.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.2 Other Third-Party Services</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>App Stores:</strong> When you download our app through Apple App Store or Google Play Store, your use is subject to their respective terms and privacy policies.</li>
              <li><strong>Analytics:</strong> We may use analytics services to understand app usage and improve our services.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>With Your Consent:</strong> When you participate in challenges, your username and progress may be visible to other participants</li>
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our app (e.g., database hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with notice to users)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Access:</strong> Request access to your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Revoke Permissions:</strong> Revoke access to wearable device data at any time through your device settings or app preferences</li>
              <li><strong>Opt-Out:</strong> Opt out of certain data collection or marketing communications</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, please contact us at <a href="mailto:support@letsfitgo.com" className="text-blue-600 hover:text-blue-700">support@letsfitgo.com</a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Let&apos;s Fit Go is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:support@letsfitgo.com" className="text-blue-600 hover:text-blue-700">support@letsfitgo.com</a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Website:</strong> <Link href="/" className="text-blue-600 hover:text-blue-700">letsfitgo.com</Link>
              </p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


