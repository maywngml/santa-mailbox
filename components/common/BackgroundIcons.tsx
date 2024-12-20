import { Fragment } from 'react';
import Image from 'next/image';

function BackgroundIcons() {
  return (
    <Fragment>
      <div className='absolute top-[calc(50%-200px)] left-[calc(50%+40px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] -rotate-[0.31deg] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%-260px)] lg:left-[calc(50%+320px)]'>
        <Image
          src={'/images/snowflake.png'}
          fill
          sizes='100%'
          alt='눈 결정체 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%-160px)] left-[calc(50%+130px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] rotate-[18.31deg] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%-340px)] lg:left-[calc(50%+540px)]'>
        <Image
          src={'/images/snowflake.png'}
          fill
          sizes='100%'
          alt='눈 결정체 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%-60px)] left-[calc(50%+130px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] -rotate-[96.71deg] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%-140px)] lg:left-[calc(50%+450px)]'>
        <Image
          src={'/images/candy-cane.png'}
          fill
          sizes='100%'
          alt='사탕 지팡이 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%+180px)] left-[calc(50%+130px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] rotate-[10.42deg] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%+50px)] lg:left-[calc(50%+520px)]'>
        <Image
          src={'/images/gingerbread-man.png'}
          fill
          sizes='100%'
          alt='쿠키 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%+260px)] left-[calc(50%+120px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] rotate-[25.31deg] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%+240px)] lg:left-[calc(50%+520px)]'>
        <Image
          src={'/images/gift.png'}
          fill
          sizes='100%'
          alt='선물 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%+250px)] left-[calc(50%+40px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] -rotate-[8.31deg] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%+255px)] lg:left-[calc(50%+280px)]'>
        <Image
          src={'/images/snowflake.png'}
          fill
          sizes='100%'
          alt='눈 결정체 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%-190px)] left-[calc(50%-120px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] -rotate-[16.27deg] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%-255px)] lg:left-[calc(50%-560px)]'>
        <Image
          src={'/images/snowflake.png'}
          fill
          sizes='100%'
          alt='눈 결정체 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%+40px)] left-[calc(50%-250px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] -rotate-[16.81deg] lg:w-[100px] lg:h-[100px] lg:top-1/2 lg:left-[calc(50%-560px)]'>
        <Image
          src={'/images/gift.png'}
          fill
          sizes='100%'
          alt='선물 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%+40px)] left-[calc(50%-150px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] -rotate-[31.61deg] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%+60px)] lg:left-[calc(50%-350px)]'>
        <Image
          src={'/images/gingerbread-man.png'}
          fill
          sizes='100%'
          alt='쿠키 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%+170px)] left-[calc(50%-140px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%+300px)] lg:left-[calc(50%-540px)]'>
        <Image
          src={'/images/candy-cane.png'}
          fill
          sizes='100%'
          alt='사탕 지팡이 이미지'
          priority
        ></Image>
      </div>
      <div className='absolute top-[calc(50%+250px)] left-[calc(50%-80px)] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] -rotate-[19.74deg] lg:w-[100px] lg:h-[100px] lg:top-[calc(50%+300px)] lg:left-[calc(50%-300px)]'>
        <Image
          src={'/images/snowflake.png'}
          fill
          sizes='100%'
          alt='눈 결정체 이미지'
          priority
        ></Image>
      </div>
    </Fragment>
  );
}

export default BackgroundIcons;
