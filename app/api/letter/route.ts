import { NextRequest, NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import connectDB from '@/db/connectDB';
import { LetterModel } from '@/db/models/Letter';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const encryptedEmail = searchParams.get('email');

    if (!encryptedEmail) {
      return NextResponse.json(
        {
          error: '이메일 파라미터가 누락되었습니다.',
        },
        {
          status: 400,
        }
      );
    }

    const decodedEncryptedEmail = decodeURIComponent(encryptedEmail);
    const bytes = CryptoJS.AES.decrypt(
      decodedEncryptedEmail,
      process.env.CRYPTO_SECRET_KEY as string
    );
    const email = bytes.toString(CryptoJS.enc.Utf8);
    const letter = await LetterModel.findOne({ email });

    console.log({ letter });

    return NextResponse.json(
      {
        success: true,
        hasLetter: !!letter,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('get letter api error', error);
    return NextResponse.json(
      {
        error:
          '편지 작성 여부를 조회하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      },
      { status: 500 }
    );
  }
}
