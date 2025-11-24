# Let's Fit Go - Invite Landing Page Implementation Guide

## Overview

This guide provides complete specifications for building a landing page that handles challenge invite links for the Let's Fit Go fitness app. The landing page will display challenge information and intelligently redirect users to download the app or open it if already installed.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Vercel
- **Language**: TypeScript

## Project Setup

### 1. Create Next.js Project

```bash
npx create-next-app@latest lfg-invite-page
# Choose:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind CSS: Yes
# - src/ directory: Yes
# - App Router: Yes
# - Customize default import alias: No
```

### 2. Install shadcn/ui

```bash
npx shadcn-ui@latest init
# Choose defaults (New York style, Zinc color)

# Install required components
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add skeleton
```

## File Structure

```
lfg-invite-page/
├── src/
│   ├── app/
│   │   ├── invite/
│   │   │   └── [token]/
│   │   │       └── page.tsx          # Main invite page
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage (redirect to main app site)
│   ├── components/
│   │   ├── ui/                       # shadcn components
│   │   ├── InviteCard.tsx           # Challenge info card
│   │   ├── AppStoreButtons.tsx      # Download buttons
│   │   └── LoadingState.tsx         # Loading skeleton
│   ├── lib/
│   │   ├── utils.ts                 # Utility functions
│   │   └── api.ts                   # API client for backend
│   └── types/
│       └── challenge.ts             # TypeScript interfaces
├── public/
│   ├── app-icon.png                 # App icon
│   ├── app-store-badge.svg          # App Store badge
│   └── google-play-badge.png        # Google Play badge
├── .env.local                        # Environment variables
└── vercel.json                       # Vercel configuration
```

## API Integration

### Backend Endpoint

**GET** `https://intelligent-energy-production-7df5.up.railway.app/api/v1/challenges/invite/:token`

**Response** (when valid):
```json
{
  "isValid": true,
  "challengeName": "Summer Fitness Challenge",
  "description": "30-day fitness challenge for summer",
  "startDate": "2024-06-01T00:00:00Z",
  "endDate": "2024-06-30T23:59:59Z",
  "participantCount": 15,
  "maxParticipants": 50,
  "challengeId": "uuid-here",
  "expiresAt": "2024-07-01T00:00:00Z"
}
```

**Response** (when invalid):
```json
{
  "isValid": false,
  "error": "Invalid invite",
  "message": "This invite link is invalid or has expired"
}
```

## Environment Variables

Create `.env.local`:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=https://intelligent-energy-production-7df5.up.railway.app/api/v1

# App Store URLs (update with actual URLs when available)
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/lets-fit-go/id123456789
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.jagansudan.templfg

# App Custom Scheme
NEXT_PUBLIC_APP_SCHEME=lfg
```

## Core Implementation

### 1. Type Definitions (`src/types/challenge.ts`)

```typescript
export interface ChallengeInvite {
  isValid: boolean;
  challengeName?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  participantCount?: number;
  maxParticipants?: number;
  challengeId?: string;
  expiresAt?: string;
  error?: string;
  message?: string;
}
```

### 2. API Client (`src/lib/api.ts`)

```typescript
import { ChallengeInvite } from '@/types/challenge';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchChallengeByInviteToken(
  token: string
): Promise<ChallengeInvite> {
  try {
    const response = await fetch(`${API_BASE_URL}/challenges/invite/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        isValid: false,
        error: errorData.error || 'Invalid invite',
        message: errorData.message || 'This invite link is invalid or has expired',
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching invite:', error);
    return {
      isValid: false,
      error: 'Network error',
      message: 'Failed to load invite information. Please try again.',
    };
  }
}
```

### 3. Main Invite Page (`src/app/invite/[token]/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchChallengeByInviteToken } from '@/lib/api';
import { ChallengeInvite } from '@/types/challenge';
import InviteCard from '@/components/InviteCard';
import AppStoreButtons from '@/components/AppStoreButtons';
import LoadingState from '@/components/LoadingState';

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
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
      
      const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'lfg';
      const deepLink = `${appScheme}://invite/${token}`;
      
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
            Learn more about Let's Fit Go →
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
            <img
              src="/app-icon.png"
              alt="Let's Fit Go"
              className="w-16 h-16 rounded-xl"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            You've been invited!
          </h1>
          <p className="text-lg text-gray-600">
            Join the challenge on Let's Fit Go
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
            Download Let's Fit Go to accept this challenge invite
          </p>
          <AppStoreButtons />
          
          {/* Already have app hint */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Already have the app?{' '}
              <button
                onClick={() => {
                  window.location.href = `${process.env.NEXT_PUBLIC_APP_SCHEME}://invite/${token}`;
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Open Let's Fit Go
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
```

### 4. Invite Card Component (`src/components/InviteCard.tsx`)

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Target } from 'lucide-react';
import { ChallengeInvite } from '@/types/challenge';

interface InviteCardProps {
  invite: ChallengeInvite;
}

export default function InviteCard({ invite }: InviteCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysRemaining = () => {
    if (!invite.endDate) return null;
    const now = new Date();
    const end = new Date(invite.endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Ended';
    if (diffDays === 0) return 'Ends today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  return (
    <Card className="border-2 border-blue-100 shadow-xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {invite.challengeName}
            </CardTitle>
            {invite.description && (
              <p className="text-gray-600 text-base leading-relaxed">
                {invite.description}
              </p>
            )}
          </div>
          <Badge variant="secondary" className="ml-4">
            Challenge
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Duration */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Duration</p>
              <p className="text-sm font-semibold text-gray-900">
                {getDaysRemaining()}
              </p>
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Participants</p>
              <p className="text-sm font-semibold text-gray-900">
                {invite.participantCount}
                {invite.maxParticipants && ` / ${invite.maxParticipants}`}
              </p>
            </div>
          </div>

          {/* Challenge Type */}
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Type</p>
              <p className="text-sm font-semibold text-gray-900">
                Fitness Score
              </p>
            </div>
          </div>
        </div>

        {/* Date Range */}
        {invite.startDate && invite.endDate && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Starts:</span>{' '}
              {formatDate(invite.startDate)}
              <span className="mx-2">→</span>
              <span className="font-medium">Ends:</span>{' '}
              {formatDate(invite.endDate)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### 5. App Store Buttons (`src/components/AppStoreButtons.tsx`)

```typescript
import Image from 'next/image';

export default function AppStoreButtons() {
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL;
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* App Store Button */}
      {appStoreUrl && (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-transform hover:scale-105"
        >
          <img
            src="/app-store-badge.svg"
            alt="Download on the App Store"
            className="h-12"
          />
        </a>
      )}

      {/* Google Play Button */}
      {playStoreUrl && (
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-transform hover:scale-105"
        >
          <img
            src="/google-play-badge.png"
            alt="Get it on Google Play"
            className="h-12"
          />
        </a>
      )}

      {/* Fallback if no URLs configured */}
      {!appStoreUrl && !playStoreUrl && (
        <div className="text-center space-y-2">
          <p className="text-gray-600">Coming soon to:</p>
          <div className="flex gap-3">
            <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">
              App Store
            </span>
            <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">
              Google Play
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 6. Loading State (`src/components/LoadingState.tsx`)

```typescript
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="w-20 h-20 rounded-2xl mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-48 mx-auto" />
        </div>

        {/* Card Skeleton */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-5 w-48 mx-auto" />
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Vercel Deployment

### 1. Vercel Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### 2. Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Invite landing page"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy

3. **Custom Domain** (optional)
   - Add custom domain in Vercel dashboard
   - Update DNS records as instructed
   - SSL certificate is automatic

### 3. Environment Variables in Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://intelligent-energy-production-7df5.up.railway.app/api/v1
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/lets-fit-go/id123456789
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.jagansudan.templfg
NEXT_PUBLIC_APP_SCHEME=lfg
```

## Testing Checklist

### Local Testing

- [ ] Valid invite token displays challenge correctly
- [ ] Invalid invite token shows error message
- [ ] Expired invite shows appropriate message
- [ ] Deep link attempt occurs automatically
- [ ] Manual "Open App" button works
- [ ] App Store buttons link correctly
- [ ] Responsive design works on mobile
- [ ] Loading state displays properly

### Production Testing

- [ ] Test with actual invite token from app
- [ ] Test on iOS Safari (deep linking)
- [ ] Test on Android Chrome (deep linking)
- [ ] Test on desktop browsers
- [ ] Verify SEO meta tags
- [ ] Check page load performance
- [ ] Verify API calls work in production

## Assets Needed

Download and add to `/public`:

1. **app-icon.png** - Your app icon (512x512px recommended)
2. **app-store-badge.svg** - [Download from Apple](https://developer.apple.com/app-store/marketing/guidelines/)
3. **google-play-badge.png** - [Download from Google](https://play.google.com/intl/en_us/badges/)

## SEO & Meta Tags

Add to `src/app/layout.tsx`:

```typescript
export const metadata = {
  title: 'Join Challenge - Let\'s Fit Go',
  description: 'You\'ve been invited to join a fitness challenge on Let\'s Fit Go',
  openGraph: {
    title: 'Join my fitness challenge!',
    description: 'Accept this challenge invite on Let\'s Fit Go',
    images: ['/app-icon.png'],
  },
};
```

## Future Enhancements

1. **QR Code Generation** - Add QR code for easy sharing
2. **Social Sharing** - Add share buttons for social media
3. **Analytics** - Track invite conversions
4. **A/B Testing** - Test different messaging
5. **Localization** - Support multiple languages
6. **Preview Cards** - Rich social media previews

## Support

For issues or questions:
- Backend API: Check Railway logs
- Frontend: Check Vercel deployment logs
- Deep linking: Test with actual devices (simulators behave differently)

## Notes

- Deep linking behavior varies by platform and browser
- iOS Safari requires user interaction for app opening
- Android Chrome shows a prompt before opening apps
- Always test on real devices before launch
- Keep token length at 6 characters (as per backend implementation)

