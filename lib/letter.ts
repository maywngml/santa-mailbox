import fetchAPI from '@/lib/fetchAPI';
import CryptoJS from 'crypto-js';
import type { LetterPayload, LetterResponse } from '@/types/letter';

export async function getLetter(
  email: string,
  isEncrypted: boolean = false
): Promise<LetterResponse> {
  const encryptedEmail = isEncrypted
    ? email
    : encodeURIComponent(
        CryptoJS.AES.encrypt(
          email,
          process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string
        ).toString()
      );

  return fetchAPI({
    method: 'GET',
    url: `/letter?email=${encryptedEmail}`,
  });
}

export async function postLetter({ email, name, content }: LetterPayload) {
  return fetchAPI({
    method: 'POST',
    url: '/letter',
    body: {
      email,
      name,
      content,
    },
  });
}
