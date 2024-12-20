import fetchAPI from '@/lib/fetchAPI';
import { getEncryptedText } from '@/lib/helpers';
import type { EmailVerificationResponse } from '@/types/emailVerification';

export async function getEmailVerification(
  email: string
): Promise<EmailVerificationResponse> {
  const encryptedEmail = encodeURIComponent(
    getEncryptedText(email, process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string)
  );

  return fetchAPI({
    method: 'GET',
    url: `/email-verification?email=${encryptedEmail}`,
  });
}

export async function postVerificationEmail(email: string) {
  const encryptedEmail = encodeURIComponent(
    getEncryptedText(email, process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string)
  );

  return fetchAPI({
    method: 'POST',
    url: `/verify/email?email=${encryptedEmail}`,
  });
}
