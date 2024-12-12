'use client';
import { useCallback, useRef } from 'react';
import { Parisienne } from 'next/font/google';
import { BackgroundIcons, SoundToggleButton } from '@/components/common';
import type { ReactNode } from 'react';

const parisienne = Parisienne({ weight: '400', subsets: ['latin'] });

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const soundRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <section>
      <h1
        className={`${parisienne.className} mt-5 text-[40px] text-center lg:text-[110px]`}
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
      <BackgroundIcons />
      {children}
    </section>
  );
}
