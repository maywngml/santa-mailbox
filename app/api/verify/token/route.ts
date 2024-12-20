import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/db/connectDB';
import { EmailVerificationModel } from '@/db/models/EmailVerification';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const bearerToken = request.headers.get('authorization');

    if (!bearerToken) {
      return NextResponse.json(
        {
          error:
            '이메일 인증 링크가 유효하지 않습니다. 인증 링크를 확인해주세요.',
        },
        { status: 500 }
      );
    }

    const token = bearerToken.split(' ')[1];
    const findResult = await EmailVerificationModel.findOne({
      verificationToken: token,
    });

    console.log('verify token api dbresult', findResult);

    if (findResult) {
      return NextResponse.json(
        {
          success: false,
          error: '이미 인증된 링크입니다. 이메일 인증이 완료되었습니다.',
        },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const saveResult = await new EmailVerificationModel({
      email: (<any>decoded).email,
      verificationToken: token,
      isVerified: true,
      createdAt: new Date(),
    }).save();

    console.log('verify token api save result', saveResult);

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error({ error });

    let errorMessage =
      '인증 메일 확인 도중 오류가 발생했어요. 잠시 후 다시 시도해주세요.';

    if (error instanceof Error && error.name.includes('token')) {
      if (error.name === 'TokenExpiredError') {
        errorMessage =
          '인증 시간이 만료되었습니다. 이메일 인증을 다시 진행해주세요.';
      } else {
        errorMessage =
          '이메일 인증 링크가 유효하지 않습니다. 인증 링크를 확인해주세요.';
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
