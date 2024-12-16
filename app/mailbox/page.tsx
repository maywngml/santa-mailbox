'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { LetterViewModal } from '@/components/letter';

export default function Mailbox() {
  const mailboxRef = useRef<HTMLDivElement | null>(null);
  const [isLetterViewModalOpen, setIsLetterViewModalOpen] =
    useState<boolean>(false);

  const changeIsLetterViewModalOpen = () => {
    setIsLetterViewModalOpen(
      (prevIsLetterViewModalOpen) => !prevIsLetterViewModalOpen
    );
  };

  const handleCardClick = () => {
    changeIsLetterViewModalOpen();
  };

  const handleCardMouseEnter = () => {
    if (!mailboxRef.current) return;
    mailboxRef.current.style.transform = `scale(1.1)`;
  };

  const handleCardMouseLeave = () => {
    if (!mailboxRef.current) return;
    mailboxRef.current.style.transform = `scale(1)`;
  };

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep text-center '>
      <div className='mobile:w-[90vw] mobile:max-w-[400px] flex flex-col items-center gap-3'>
        <div
          className='relative mobile:w-[200px] mobile:h-[200px] w-[400px] h-[400px] hover:cursor-pointer'
          ref={mailboxRef}
          onClick={handleCardClick}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
        >
          <Image
            src={'/images/mailbox.png'}
            fill
            sizes='100%'
            alt='빨간색 우체통 이미지'
            priority
          ></Image>
        </div>
        <p className='mt-2 text-sm lg:mt-4 lg:text-lg'>
          산타 할아버지의 답장이 도착했어요 💌
          <span className='block'>우체통을 클릭해보세요!</span>
        </p>
      </div>
      <LetterViewModal
        isOpen={isLetterViewModalOpen}
        onClose={changeIsLetterViewModalOpen}
        letterId='1'
      />
    </div>
  );
}
