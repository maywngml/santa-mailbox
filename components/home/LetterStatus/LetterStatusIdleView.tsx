import { Fragment, useRef } from 'react';
import Image from 'next/image';

interface LetterStatusIdleViewProps {
  onCardClick: () => void;
}

export default function LetterStatusIdleView({
  onCardClick,
}: LetterStatusIdleViewProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleCardMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `scale(1.1)`;
  };

  const handleCardMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `scale(1)`;
  };
  return (
    <Fragment>
      <div
        className='relative mx-auto w-[250px] h-[250px] z-[1] hover:cursor-pointer lg:w-[450px] lg:h-[450px]'
        ref={cardRef}
        onClick={onCardClick}
        onMouseEnter={handleCardMouseEnter}
        onMouseLeave={handleCardMouseLeave}
      >
        <Image
          src={'/images/christmas-card.png'}
          fill
          sizes='100%'
          alt='크리스마스 카드 이미지'
          priority
        />
      </div>
      <p className='mt-6 text-sm lg:text-lg'>
        편지지를 클릭해 산타할아버지에게 <br className='block lg:hidden' />
        편지를 보내보세요 📩
      </p>
      <div className='absolute top-[calc(50%-104px)] left-[calc(50%-104px)] -translate-x-1/2 -translate-y-1/2 w-[80px] h-[98px] -rotate-[13.75deg] z-[2] lg:w-[170px] lg:h-[210px] lg:top-[calc(50%-180px)] lg:left-[calc(50%-195px)]'>
        <Image
          src={'/images/santa-claus.png'}
          fill
          sizes='100%'
          alt='산타 클로스 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%+50px)] left-[calc(50%+110px)] -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rotate-[31.9deg] lg:w-[300px] lg:h-[300px] lg:top-[calc(50%+50px)] lg:left-[calc(50%+210px)]'>
        <Image
          src={'/images/christmas-wreath.png'}
          fill
          sizes='100%'
          alt='크리스마스 화환 이미지'
          priority
        ></Image>
      </div>
    </Fragment>
  );
}
