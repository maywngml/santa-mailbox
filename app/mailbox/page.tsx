'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { LetterViewModal } from '@/components/letter';

export default function Mailbox() {
  const searchParams = useSearchParams();
  const letterId = searchParams.get('letterId');
  const [isLetterViewModalOpen, setIsLetterViewModalOpen] =
    useState<boolean>(false);
  const information = [
    ['산타 할아버지의 답장이 도착했어요 💌', '우체통을 클릭해보세요!'],
    ['산타 할아버지에게 받은 답장이 없어요 😢', '메일함을 다시 확인해 주세요!'],
  ];

  const changeIsLetterViewModalOpen = () => {
    setIsLetterViewModalOpen(
      (prevIsLetterViewModalOpen) => !prevIsLetterViewModalOpen
    );
  };

  const handleCardClick = () => {
    if (!letterId) return;
    changeIsLetterViewModalOpen();
  };

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep text-center '>
      <div className='mobile:w-[90vw] mobile:max-w-[400px] flex flex-col items-center gap-3'>
        <div
          className={`relative mobile:w-[200px] mobile:h-[200px] w-[400px] h-[400px] ${
            letterId && 'hover:cursor-pointer hover:scale-110'
          }`}
          onClick={handleCardClick}
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
          {letterId ? information[0][0] : information[1][0]}
          <span className='block'>
            {letterId ? information[0][1] : information[1][1]}
          </span>
        </p>
        {isLetterViewModalOpen && letterId && (
          <LetterViewModal
            isOpen={isLetterViewModalOpen}
            onClose={changeIsLetterViewModalOpen}
            letterId={letterId}
          />
        )}
      </div>
    </div>
  );
}
