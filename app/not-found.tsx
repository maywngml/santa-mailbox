import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className='relative text-center mt-[50px] z-[1] lg:mt-[120px]'>
      <h2 className='text-[80px] leading-[80px] lg:text-[120px] lg:leading-[120px]'>
        404
      </h2>
      <p className='my-4 text-sm lg:my-5 lg:text-lg'>
        존재하지 않는 페이지입니다. <br />
        아래 버튼을 클릭해 홈페이지로 이동해주세요.
      </p>
      <Link
        className='inline-block px-3 py-2 bg-dark-green rounded-[10px] text-sm lg:px-4 lg:py-3 lg:text-lg'
        href='/'
      >
        홈페이지로 이동
      </Link>
    </div>
  );
}
