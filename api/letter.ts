import fetchAPI from '@/lib/fetchAPI';
import CryptoJS from 'crypto-js';
import type { LetterPayload } from '@/types/letter';

export async function getLetter(email: string) {
  const encryptedEmail = CryptoJS.AES.encrypt(
    email,
    process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string
  ).toString();
  const encodedEncryptedEmail = encodeURIComponent(encryptedEmail);

  return fetchAPI({
    method: 'GET',
    url: `/letter?email=${encodedEncryptedEmail}`,
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
