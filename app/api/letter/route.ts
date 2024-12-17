import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/db/connectDB';
import { LetterModel } from '@/db/models/Letter';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    // TODO: 이메일 암호화, 복호화
    const email = searchParams.get('email');
    const letter = await LetterModel.findOne({ email });
    console.log({ letter });
    return NextResponse.json({ success: true, hasLetter: !!letter });
  } catch (error) {
    console.error('get letter api occur error', error);
    return NextResponse.json({ success: false, hasLetter: false });
  }
}
