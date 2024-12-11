'use client';
import { useCallback, useRef, useState } from 'react';
import { Parisienne } from 'next/font/google';
import { BackgroundIcons, SoundToggleButton } from '@/components/common';
import {
  LetterStatusFailureView,
  LetterStatusIdleView,
  LetterStatusLoadingView,
  LetterStatusSuccessView,
} from '@/components/home';
import { LetterFormModal } from '@/components/letter';
import type { LetterStatusType } from '@/types/letter';

const parisienne = Parisienne({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const [isLetterFormModalOpen, setIsLetterFormModalOpen] =
    useState<boolean>(false);
  const [letterStatus, setLetterStatus] = useState<LetterStatusType>('idle');

  const changeIsLetterFormModalOpen = () => {
    setIsLetterFormModalOpen(
      (prevIsLetterFormModalOpen) => !prevIsLetterFormModalOpen
    );
  };

  const handleCardClick = () => {
    changeIsLetterFormModalOpen();
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
    setLetterStatus(status);
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
      {
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep'>
          {letterStatus === 'failure' && <LetterStatusFailureView />}
          {letterStatus === 'idle' && (
            <LetterStatusIdleView onCardClick={handleCardClick} />
          )}
          {letterStatus === 'loading' && <LetterStatusLoadingView />}
          {letterStatus === 'success' && <LetterStatusSuccessView />}
        </div>
      }
      <BackgroundIcons />
      <LetterFormModal
        isOpen={isLetterFormModalOpen}
        onClose={changeIsLetterFormModalOpen}
        onSend={handleLetterSend}
      />
    </section>
  );
}
