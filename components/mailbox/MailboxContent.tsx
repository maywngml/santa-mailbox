'use client';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { LetterViewModal } from '@/components/letter';
import { getLetter } from '@/lib/letter';

export default function MailboxContent() {
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
        title: '산타 할아버지의 답장을 확인하고 있어요.',
        subtitle: '잠시만 기다려주세요!',
      };
    }
    if (letterResponse.data?.letter) {
      return {
        title: '산타 할아버지의 답장이 도착했어요 💌',
        subtitle: '우체통을 클릭해보세요!',
      };
    }
    return {
      title: '산타 할아버지에게 받은 답장이 없어요 😢',
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
    <Fragment>
      <div
        className={`relative mobile:w-[200px] mobile:h-[200px] w-[400px] h-[400px] ${
          letterResponse.data?.letter && 'hover:cursor-pointer hover:scale-110'
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
        {getMessage().title}
        <span className='block'>{getMessage().subtitle}</span>
      </p>
      {isLetterViewModalOpen && letterResponse.data?.letter && (
        <LetterViewModal
          isOpen={isLetterViewModalOpen}
          isReply={true}
          onClose={changeIsLetterViewModalOpen}
          letter={letterResponse.data?.letter.reply}
        />
      )}
    </Fragment>
  );
}
