import { NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import nodemailer from 'nodemailer';
import { LetterModel } from '@/db/models/Letter';
import type { Letter } from '@/db/models/Letter';

export async function GET() {
  try {
    await connectDB();

    const headers = new Headers({ 'Cache-Control': 'no-store' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_AUTH_EMAIL,
        pass: process.env.GMAIL_AUTH_PASSWORD,
      },
    });
    const letters = await LetterModel.find();
    const emailPromises = letters.map((letter: Letter) =>
      transporter.sendMail({
        from: process.env.GMAIL_AUTH_EMAIL,
        to: letter.email,
        subject: '[산타 우체통] 산타 할아버지의 답장이 도착했어요💌',
        html: `<p>드디어 기다리던 크리스마스가 시작됐어요!</p><p>산타 할아버지에게서 특별한 답장이 도착했다는데요!</p><p>지금 바로 확인해보러 가볼까요?</p><a href='${process.env.HOMEPAGE_URL}/mailbox?letterId=${letter.id}'>👉 [답장 확인하러 가기]</a><p>산타 할아버지의 마음이 담긴 답장과 함께</p><p>행복이 가득한 크리스마스를 보내시길 바래요.</p><p>올 한해도 고생 많으셨습니다💗</p><p>메리 크리스마스!🎄✨</p>`,
      })
    );
    const result = await Promise.allSettled(emailPromises);

    console.log('send email api', result);

    return NextResponse.json(
      {
        result,
      },
      {
        headers,
        status: 200,
      }
    );
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
