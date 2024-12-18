'use client';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  LetterStatusFailureView,
  LetterStatusIdleView,
  LetterStatusLoadingView,
  LetterStatusSuccessView,
} from '@/components/home';
import { LetterFormModal } from '@/components/letter';
import { postLetter } from '@/api/letter';
import type { LetterPayload } from '@/types/letter';

export default function Home() {
  const mutation = useMutation({
    mutationFn: (payload: LetterPayload) => postLetter(payload),
  });
  const [isLetterFormModalOpen, setIsLetterFormModalOpen] =
    useState<boolean>(false);
  const changeIsLetterFormModalOpen = () => {
    setIsLetterFormModalOpen(
      (prevIsLetterFormModalOpen) => !prevIsLetterFormModalOpen
    );
  };

  const handleCardClick = useCallback(() => {
    changeIsLetterFormModalOpen();
  }, []);

  const handleLetterSend = (payload: LetterPayload) => {
    changeIsLetterFormModalOpen();
    mutation.mutate(payload);
  };

  return (
    <div className='text-center'>
      {
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep'>
          {mutation.isError && <LetterStatusFailureView />}
          {mutation.isIdle && (
            <LetterStatusIdleView onCardClick={handleCardClick} />
          )}
          {mutation.isPending && <LetterStatusLoadingView />}
          {mutation.isSuccess && <LetterStatusSuccessView />}
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
