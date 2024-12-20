import type { EmailVerification } from '@/db/models/EmailVerification';

export interface EmailVerificationResponse {
  success: boolean;
  emailVerification: EmailVerification;
}
