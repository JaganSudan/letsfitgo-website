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


