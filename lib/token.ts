import fetchAPI from './fetchAPI';

export async function verifyToken(
  token: string | undefined
): Promise<{ message: string }> {
  try {
    if (!token) {
      return {
        message:
          '이메일 인증 링크가 유효하지 않습니다. 인증 링크를 확인해주세요.',
      };
    }
    const result = await fetchAPI({
      method: 'POST',
      url: '/verify/token',
      token,
    });
    return {
      message:
        '이메일 인증이 완료되었어요. 이제 산타 할아버지께 편지를 완성해 보세요.',
    };
  } catch (error) {
    console.error({ error });
    const message =
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    return { message };
  }
}
