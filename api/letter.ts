import fetchAPI from '@/lib/fetchAPI';
import CryptoJS from 'crypto-js';

export async function GetLetter(email: string) {
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
