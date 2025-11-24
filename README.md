# Let's Fit Go - Invite Landing Page

A Next.js landing page for handling challenge invite links for the Let's Fit Go fitness app.

## Features

- **Smart Deep Linking**: Automatically attempts to open the app if installed
- **Challenge Display**: Shows challenge information from the backend API
- **App Store Redirects**: Direct links to download the app from App Store and Google Play
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Error Handling**: Graceful handling of invalid or expired invites

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file (already created with defaults):

```bash
NEXT_PUBLIC_API_URL=https://intelligent-energy-production-7df5.up.railway.app/api/v1
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/lets-fit-go/id123456789
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.jagansudan.templfg
NEXT_PUBLIC_APP_SCHEME=lfg
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Update for production
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the homepage.

### Testing Invite Links

Visit `http://localhost:3000/invite/[TOKEN]` where `[TOKEN]` is a 6-character invite token.

## Project Structure

```
src/
├── app/
│   ├── invite/[token]/page.tsx  # Main invite page
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Homepage
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── InviteCard.tsx          # Challenge info display
│   ├── AppStoreButtons.tsx     # Download buttons
│   └── LoadingState.tsx         # Loading skeleton
├── lib/
│   ├── api.ts                   # API client
│   ├── constants.ts             # Environment constants
│   └── utils.ts                 # Utility functions
└── types/
    └── challenge.ts             # TypeScript interfaces
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The `vercel.json` file is already configured.

## Assets

Replace placeholder assets in `/public`:

- `app-icon.svg` - Your app icon (512x512px recommended)
- `app-store-badge.svg` - Apple App Store badge
- `google-play-badge.png` - Google Play badge

See `public/README_ASSETS.md` for more details.

## API Integration

The landing page fetches challenge data from:
```
GET {NEXT_PUBLIC_API_URL}/challenges/invite/:token
```

See `LANDING_PAGE_IMPLEMENTATION_GUIDE.md` for complete API documentation.

## License

Private project for Let's Fit Go.



