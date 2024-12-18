'use client';
import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  LetterStatusFailureView,
  LetterStatusIdleView,
  LetterStatusLoadingView,
  LetterStatusSuccessView,
} from '@/components/home';
import { LetterFormModal } from '@/components/letter';
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
      {
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep'>
          {mutation.isError && (
            <LetterStatusFailureView onResend={handleLetterResend} />
          )}
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
