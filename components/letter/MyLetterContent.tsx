'use client';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { LetterViewModal } from '@/components/letter';
import { getLetter } from '@/lib/letter';

export default function MyLetterContent() {
  const searchParams = useSearchParams();
  const letterId = searchParams.get('letterId') || '';
  const letterResponse = useQuery({
    queryKey: ['letter'],
    queryFn: () => getLetter(letterId, true),
  });
  const [isLetterViewModalOpen, setIsLetterViewModalOpen] =
    useState<boolean>(false);

  const getMessage = () => {
    if (letterResponse.isPending) {
      return {
        title: '작성하신 편지가 있는지 확인하고 있어요.',
        subtitle: '잠시만 기다려주세요!',
      };
    }
    if (letterResponse.data?.letter) {
      return {
        title: '작성하신 편지가 있네요 💌',
        subtitle: '편지 봉투를 클릭해보세요!',
      };
    }
    return {
      title: '작성하신 편지가 없어요 😢',
      subtitle: '메일함을 다시 확인해 주세요!',
    };
  };

  const changeIsLetterViewModalOpen = () => {
    setIsLetterViewModalOpen(
      (prevIsLetterViewModalOpen) => !prevIsLetterViewModalOpen
    );
  };

  const handleCardClick = () => {
    if (!letterResponse.data?.letter) return;
    changeIsLetterViewModalOpen();
  };

  return (
    <div className='mobile:w-[90vw] mobile:max-w-[400px] flex flex-col items-center'>
      <Image
        className={
          letterResponse.data?.letter && 'hover:cursor-pointer hover:scale-110'
        }
        src='/images/letter.png'
        width={200}
        height={200}
        alt='이메일 이미지'
        onClick={handleCardClick}
      />
      <p className='mt-2 text-sm lg:mt-4 lg:text-lg'>
        {getMessage().title}
        <span className='block'>{getMessage().subtitle}</span>
      </p>
      {isLetterViewModalOpen && letterResponse.data?.letter && (
        <LetterViewModal
          isOpen={isLetterViewModalOpen}
          onClose={changeIsLetterViewModalOpen}
          letter={letterResponse.data?.letter.content}
        />
      )}
    </div>
  );
}
