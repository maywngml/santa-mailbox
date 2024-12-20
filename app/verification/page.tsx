import Image from 'next/image';
import { verifyToken } from '@/lib/token';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Verification(props: {
  searchParams: SearchParams;
}) {
  const { token } = await props.searchParams;
  const result = typeof token === 'string' && (await verifyToken(token));
  const message = result.message
    ? result.message.split(/(?<=\.) /)
    : [
        '이메일 인증이 완료되었어요.',
        '산타 할아버지에게 편지를 마저 작성해주세요.',
      ];

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep text-center'>
      <div className='mobile:w-[90vw] mobile:max-w-[400px] flex flex-col items-center'>
        <Image
          src='/images/letter.png'
          width={200}
          height={200}
          alt='목에 빨간 띠를 두르고 달려가는 루돌프'
        />
        {message.map((text: string, index: number) => (
          <p
            className='text-sm lg:text-lg'
            key={`message-${index}`}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
