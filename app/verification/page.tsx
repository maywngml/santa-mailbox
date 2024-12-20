import Image from 'next/image';
import { verifyToken } from '@/lib/token';

type SearchParams = { token?: string };

export default async function Verification(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { token } = await props.searchParams;
  const result = await verifyToken(token);
  const message = result.message.split(/(?<=\.) /);

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep text-center'>
      <div className='mobile:w-[90vw] mobile:max-w-[400px] flex flex-col items-center'>
        <Image
          src='/images/letter.png'
          width={200}
          height={200}
          alt='이메일 이미지'
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
