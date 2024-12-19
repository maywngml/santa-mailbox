import { NextRequest, NextResponse } from 'next/server';
import { EmailVerificationModel } from '@/db/models/EmailVerification';
import connectDatabase from '@/db/connectDB';
import { getDecryptedText } from '@/lib/helpers';

export async function GET(request: NextRequest) {
  try {
    await connectDatabase();
    const searchParams = request.nextUrl.searchParams;
    const encryptedEmail = searchParams.get('email');
    const token = searchParams.get('token');

    if (!encryptedEmail && !token) {
      return NextResponse.json(
        {
          error: '이메일이나 토큰을 제공해야 합니다.',
        },
        { status: 500 }
      );
    }

    let filter;

    if (encryptedEmail) {
      const decodedEncryptedEmail = decodeURIComponent(encryptedEmail);
      const email = getDecryptedText(decodedEncryptedEmail);
      filter = { email };
    } else {
      filter = { verificationToken: token };
    }

    const emailVerification = await EmailVerificationModel.findOne(filter);

    console.log('get email veirifcation', emailVerification);

    return NextResponse.json(
      {
        success: true,
        emailVerification,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      {
        success: false,
        error:
          '이메일 인증 여부를 확인하던 도중 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}
