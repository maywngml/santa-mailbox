'use client';
import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { postLetter } from '@/lib/letter';
import type { LetterPayload } from '@/types/letter';

export default function Home() {
  const mutation = useMutation({
    mutationFn: (payload: LetterPayload) => postLetter(payload),
  });
  const [isLetterFormModalOpen, setIsLetterFormModalOpen] =
    useState<boolean>(false);
  const letterPayload = useRef<LetterPayload>();

  const changeIsLetterFormModalOpen = () => {
    setIsLetterFormModalOpen(
      (prevIsLetterFormModalOpen) => !prevIsLetterFormModalOpen
    );
  };

  const handleCardClick = () => {
    changeIsLetterFormModalOpen();
  };

  const handleLetterSend = (payload: LetterPayload) => {
    changeIsLetterFormModalOpen();
    mutation.mutate(payload);
    letterPayload.current = payload;
  };

  const handleLetterResend = () => {
    if (!letterPayload.current) return;
    mutation.mutate(letterPayload.current);
  };

  return (
    <div className='text-center'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep'>
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
            우리 내년 크리스마스에 또 만나요!☺️
            <span className='block'>메리 크리스마스🎄</span>
          </p>
        </div>
      </div>
    </div>
  );
}
