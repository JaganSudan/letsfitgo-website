import type { Metadata, Viewport } from 'next';
import DocsPageContent from '@/components/docs/DocsPageContent';

export const metadata: Metadata = {
  title: 'Docs',
  description:
    'Learn how challenges, workouts, points, teams, friends, invites, notifications, and supported wearables work in LFG.',
};

export const viewport: Viewport = {
  themeColor: '#f8fbff',
};

export default function DocsPage() {
  return <DocsPageContent />;
}
