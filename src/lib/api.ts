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





