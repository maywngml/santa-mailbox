import fetchAPI from '@/lib/fetchAPI';
import type { LetterPayload, LetterResponse } from '@/types/letter';
import { getEncryptedText } from '@/lib/helpers';

export async function getLetter(
  email: string,
  isEncrypted: boolean = false
): Promise<LetterResponse> {
  const encryptedEmail = isEncrypted
    ? email
    : encodeURIComponent(
        getEncryptedText(
          email,
          process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string
        )
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
