import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { EmailVerificationModel } from '@/db/models/EmailVerification';
import connectDatabase from '@/db/connectDB';
import { getDecryptedText } from '@/lib/helpers';

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    // TODO: email body에 넣도록 변경
    const searchParams = request.nextUrl.searchParams;
    const encryptedEmail = searchParams.get('email');

    if (!encryptedEmail) {
      return NextResponse.json(
        {
          error: '이메일을 제공해야 합니다.',
        },
        { status: 500 }
      );
    }

    const decodedEncryptedEmail = decodeURIComponent(encryptedEmail);
    const email = getDecryptedText(
      decodedEncryptedEmail,
      process.env.CRYPTO_SECRET_KEY as string
    );
    const emailVerification = await EmailVerificationModel.findOne({ email });

    console.log('email veirifcation verify email api', emailVerification);

    if (emailVerification && emailVerification.isVerified) {
      return NextResponse.json(
        {
          success: false,
          error: '이미 이메일 인증을 진행하셨습니다.',
        },
        { status: 500 }
      );
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '1h',
    });
    console.log(process.env.GMAIL_AUTH_EMAIL, process.env.GMAIL_AUTH_PASSWORD);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_AUTH_EMAIL,
        pass: process.env.GMAIL_AUTH_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_AUTH_EMAIL,
      to: email,
      subject: '[산타우체통] 이메일 인증을 완료해주세요!',
      html: `
    <p>
      크리스마스에 산타 할아버지의 답장을 받으려면 아래 버튼을 눌러 이메일 인증을 완료해주세요.
    </p>
    <a href="${process.env.HOMEPAGE_URL}/verification?token=${token}" class="button">이메일 인증하기</a>
    <p>
      인증 링크는 1시간 동안 유효합니다.<br />
      인증에 문제가 있다면 <a href="mailto:${process.env.GMAIL_AUTH_EMAIL}">관리자</a>에게 문의해주세요.
    </p>`,
    };
    const sendingResult = await transporter.sendMail(mailOptions);

    console.log('sending result verify email api', sendingResult);

    return NextResponse.json(
      {
        success: true,
        data: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      {
        success: false,
        error:
          '인증 메일 발송 도중 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}
