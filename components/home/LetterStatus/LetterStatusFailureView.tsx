import Image from 'next/image';
import { Button } from '../../ui';

export default function LetterStatusFailureView() {
  return (
    <div className='mobile:w-[90vw] mobile:max-w-[400px] flex flex-col items-center gap-3'>
      <div className='relative mobile:w-[150px] mobile:h-[210px] w-[250px] h-[350px]'>
        <Image
          src={'/images/crying-santa-claus.png'}
          fill
          sizes='100%'
          alt='산타 클로스 이미지'
          priority
        ></Image>
      </div>
      <p className='text-sm lg:text-lg'>
        산타 할아버지에게 편지가 전달되지 않았어요😭
        <span className='block'>
          아래의 재전송 버튼을 클릭하거나 <br className='block lg:hidden' />
          관리자에게 문의해주세요
        </span>
      </p>
      <Button className='px-3 text-sm lg:px-5 lg:text-lg'>재전송</Button>
    </div>
  );
}
