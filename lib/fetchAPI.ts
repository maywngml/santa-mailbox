import type { FetchAPIParams, FetchAPIOptions } from '@/types/common';

export default async function fetchAPI({
  method,
  url,
  body,
  token,
}: FetchAPIParams) {
  try {
    const options: FetchAPIOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    const baseURL =
      typeof window === 'undefined' ? process.env.HOMEPAGE_URL : '';
    const response = await fetch(`${baseURL}/api${url}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || '서버 요청 중 오류가 발생했습니다.');
    }

    return result;
  } catch (error) {
    console.error('fetchAPI error: ', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    );
  }
}
