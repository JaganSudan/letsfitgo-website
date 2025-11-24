'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { fetchChallengeByInviteToken } from '@/lib/api';
import { ChallengeInvite } from '@/types/challenge';
import { APP_SCHEME } from '@/lib/constants';
import InviteCard from '@/components/InviteCard';
import AppStoreButtons from '@/components/AppStoreButtons';
import LoadingState from '@/components/LoadingState';

export default function InvitePage() {
  const params = useParams();
  const token = params.token as string;

  const [invite, setInvite] = useState<ChallengeInvite | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAttemptedDeepLink, setHasAttemptedDeepLink] = useState(false);

  useEffect(() => {
    // Load invite data
    const loadInvite = async () => {
      if (!token || token.length !== 6) {
        setInvite({
          isValid: false,
          error: 'Invalid token',
          message: 'The invite link is malformed.',
        });
        setIsLoading(false);
        return;
      }

      const data = await fetchChallengeByInviteToken(token);
      setInvite(data);
      setIsLoading(false);
    };

    loadInvite();
  }, [token]);

  useEffect(() => {
    // Attempt to open app via deep link (only once)
    if (!hasAttemptedDeepLink && invite?.isValid) {
      setHasAttemptedDeepLink(true);
      
      const deepLink = `${APP_SCHEME}://invite/${token}`;
      
      console.log('Attempting to open app:', deepLink);
      
      // Try to open the app
      window.location.href = deepLink;
      
      // If app doesn't open after 2.5 seconds, user likely doesn't have it
      // The page will remain visible showing the download buttons
    }
  }, [invite, hasAttemptedDeepLink, token]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!invite?.isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {invite?.error || 'Invalid Invite'}
          </h1>
          <p className="text-gray-600 mb-6">
            {invite?.message || 'This invite link is invalid or has expired.'}
          </p>
          <a
            href="https://yourapp.com"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Learn more about Let&apos;s Fit Go →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <Image
              src="/app-icon.svg"
              alt="Let&apos;s Fit Go"
              width={64}
              height={64}
              className="rounded-xl"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            You&apos;ve been invited!
          </h1>
          <p className="text-lg text-gray-600">
            Join the challenge on Let&apos;s Fit Go
          </p>
        </div>

        {/* Challenge Info Card */}
        <InviteCard invite={invite} />

        {/* Download Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Get the App
          </h2>
          <p className="text-gray-600">
            Download Let&apos;s Fit Go to accept this challenge invite
          </p>
          <AppStoreButtons />
          
          {/* Already have app hint */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Already have the app?{' '}
              <button
                onClick={() => {
                  window.location.href = `${APP_SCHEME}://invite/${token}`;
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Open Let&apos;s Fit Go
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>
            By downloading, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

