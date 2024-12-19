import CryptoJS from 'crypto-js';

export const getEncryptedText = (message: string, key: string) => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

export const getDecryptedText = (cyperText: string) => {
  const bytes = CryptoJS.AES.decrypt(
    cyperText,
    process.env.CRYPTO_SECRET_KEY as string
  );
  const text = bytes.toString(CryptoJS.enc.Utf8);

  return text;
};
