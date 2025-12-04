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







