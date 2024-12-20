import fetchAPI from './fetchAPI';

export async function verifyToken(token: string) {
  try {
    const result = await fetchAPI({
      method: 'POST',
      url: '/verify/token',
      token,
    });
    return result;
  } catch (error) {
    console.error({ error });
    return error;
  }
}
