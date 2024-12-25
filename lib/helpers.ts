import CryptoJS from 'crypto-js';

export const getEncryptedText = (message: string, key: string) => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

export const getDecryptedText = (cyperText: string, key: string) => {
  const bytes = CryptoJS.AES.decrypt(cyperText, key);
  const text = bytes.toString(CryptoJS.enc.Utf8);

  return text;
};

export const getHypenDate = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const date = inputDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${date}`;
};
