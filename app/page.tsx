'use client';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { Parisienne } from 'next/font/google';
import { BackgroundIcons, SoundToggleButton } from '@/components/common';
import { LetterFormModal } from '@/components/letter';
import type { LetterStatusType } from '@/types/letter';

const parisienne = Parisienne({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const [isLetterFormModalOpen, setIsLetterFormModalOpen] =
    useState<boolean>(false);
  const [letterSendStatus, setLetterSendStatus] =
    useState<LetterStatusType>('idle');

  const changeIsLetterFormModalOpen = () => {
    setIsLetterFormModalOpen(
      (prevIsLetterFormModalOpen) => !prevIsLetterFormModalOpen
    );
  };

  const handleCardClick = () => {
    changeIsLetterFormModalOpen();
  };

  const handleCardMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `scale(1.1)`;
  };

  const handleCardMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `scale(1)`;
  };

  const handleSoundOnClick = useCallback(() => {
    if (!soundRef.current) return;
    soundRef.current.pause();
  }, []);

  const handleSoundOffClick = useCallback(async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.play();
    } catch (error) {
      // TODO: 노래를 재생할 수 없습니다. 토스트 메세지 띄우기
      console.error({ error });
    }
  }, []);

  const handleLetterSend = (status: LetterStatusType) => {
    setLetterSendStatus(status);
  };

  return (
    <section className='text-center'>
      <h1
        className={`${parisienne.className} mt-5 text-[40px] lg:text-[110px]`}
      >
        Merry Christmas
      </h1>
      <SoundToggleButton
        onSoundOnClick={handleSoundOnClick}
        onSoundOffClick={handleSoundOffClick}
      />
      <audio
        ref={soundRef}
        loop
      >
        <source
          src='/bgm/magic-christmas-night.mp3'
          type='audio/mp3'
        />
        현재 브라우저에서는 오디오를 지원하지 않습니다.
      </audio>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]'>
        <div
          className='relative mx-auto w-[250px] h-[250px] hover:cursor-pointer lg:w-[450px] lg:h-[450px]'
          ref={cardRef}
          onClick={handleCardClick}
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
          편지지를 클릭해 산타할아버지에게 <br className='block lg:hidden' />{' '}
          편지를 보내보세요 📩
        </p>
      </div>
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
      <BackgroundIcons />
      <LetterFormModal
        isOpen={isLetterFormModalOpen}
        onClose={changeIsLetterFormModalOpen}
        onSend={handleLetterSend}
      />
    </section>
  );
}
