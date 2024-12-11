import Image from 'next/image';

export default function LetterStatusSuccessView() {
  return (
    <div className='mobile:w-[90vw] mobile:max-w-[400px] flex flex-col items-center gap-3'>
      <div className='relative mobile:w-[150px] mobile:h-[210px] w-[250px] h-[350px]'>
        <Image
          src={'/images/santa-claus.png'}
          fill
          sizes='100%'
          alt='산타 클로스 이미지'
          priority
        ></Image>
      </div>
      <p className='text-sm lg:text-lg'>
        산타 할아버지에게 편지가 전달됐어요!
        <span className='block'>크리스마스에 메일함을 확인해주세요☺️</span>
      </p>
    </div>
  );
}
