import { getEmailVerification } from './emailVerification';
import { getLetter } from './letter';

export async function checkEmailAndLetter(email: string): Promise<{
  isVerified: boolean;
  hasLetter: boolean;
}> {
  const [emailVerificationResponse, letterResponse] = await Promise.all([
    getEmailVerification(email),
    getLetter(email),
  ]);

  return {
    isVerified: !!emailVerificationResponse.emailVerification,
    hasLetter: !!letterResponse.letter,
  };
}
