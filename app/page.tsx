'use client';
import { useState } from 'react';
import {
  LetterStatusFailureView,
  LetterStatusIdleView,
  LetterStatusLoadingView,
  LetterStatusSuccessView,
} from '@/components/home';
import { LetterFormModal } from '@/components/letter';
import type { LetterStatusType } from '@/types/letter';

export default function Home() {
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

  const handleLetterSend = (status: LetterStatusType) => {
    setLetterStatus(status);
  };

  return (
    <div className='text-center'>
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
      <LetterFormModal
        isOpen={isLetterFormModalOpen}
        onClose={changeIsLetterFormModalOpen}
        onSend={handleLetterSend}
      />
    </div>
  );
}
