'use client';
import { Fragment, useCallback, useRef } from 'react';
import { SoundToggleButton } from '@/components/ui';

export default function BgmController() {
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
    <Fragment>
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
    </Fragment>
  );
}
