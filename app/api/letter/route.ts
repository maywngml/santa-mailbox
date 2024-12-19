import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import CryptoJS from 'crypto-js';
import connectDB from '@/db/connectDB';
import { LetterModel } from '@/db/models/Letter';
import { getEncryptedText, getDecryptedText } from '@/lib/helpers';

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
    const email = getDecryptedText(decodedEncryptedEmail);
    const letter = await LetterModel.findOne({ email });

    console.log({ letter });

    return NextResponse.json(
      {
        success: true,
        letter: letter,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, content } = body;
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });
    const prompt = `당신은 산타 할아버지입니다. 사람들에게 편지로 답장을 보내고 있습니다. 사용자가 보낸 편지 내용을 바탕으로 답장을 작성해 주세요.
    1. 산타 할아버지의 말투는 따뜻하고 친절하며 긍정적이어야 합니다.
    2. 답장은 마치 따뜻한 포근한 담요처럼 사용자의 마음을 위로하고 안아주는 느낌이 들어야 합니다. 진심 어린 표현과 부드러운 위로를 담아주세요.
    3. 사용자가 보낸 편지 내용을 충분히 이해하고, 그에 맞는 **칭찬**, **공감**, **격려**, 또는 **부드러운 조언**을 포함해 주세요.
    4. 시작은 "안녕, [사용자 이름]야." 또는 "안녕, [사용자 이름]아." 라고 사용자의 이름을 다정하게 부르며 시작해 주세요. 이때, 사용자 이름은 성 빼고 이름만 불러주세요.
    5. 문장은 마치 오랜 친구처럼 편안하고 친근하게 이야기하듯 작성해 주세요. 너무 형식적이지 않게 자연스러운 일상 대화체로 작성합니다.
    6. 답장은 사용자의 감정을 공감하는 문장으로 시작해, 위로와 격려를 이어가며 마지막에는 긍정적인 미래를 그리게 하는 따뜻한 메시지로 마무리해 주세요.
    7. 마무리는 따뜻한 인사말로 끝내 주면서 "2024년 12월 25일 산타 할아버지가🎅"라고 적어주세요.
    8. 답장은 6~8문장 정도의 길이여야 합니다.
    사용자 이름: "${name}"
    사용자의 편지 내용: "${content}"  `;
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    console.log('post letter api gpt', gptResponse);
    console.log('post letter api gpt', gptResponse.choices[0].message);

    const letterId = encodeURIComponent(
      getEncryptedText(email, process.env.CRYPTO_SECRET_KEY as string)
    );
    const dbResponse = await new LetterModel({
      ...body,
      id: letterId,
      reply: gptResponse.choices[0].message.content,
      createdAt: new Date(),
    }).save();

    console.log('post letter api db', dbResponse);

    return NextResponse.json(
      {
        success: true,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('post letter api error', error);
    return NextResponse.json(
      {
        success: false,
        error:
          '편지를 보내던 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      },
      { status: 500 }
    );
  }
}
