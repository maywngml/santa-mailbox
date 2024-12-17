'use client';
import ToastMessageItem from './ToastMessageItem';
import { useToastMessageContext } from '@/providers/ToastMessageProvider';
import type { ToastMessage } from '@/types/toastMessage';

export default function ToastMessageContainer() {
  const { toastMessages } = useToastMessageContext();

  return (
    <div className='fixed flex flex-col left-1/2 bottom-6 gap-2 w-[70%] max-w-[540px] -translate-x-1/2 z-[60] lg:bottom-7 lg:gap-4'>
      {toastMessages.map((toastMessage: ToastMessage) => (
        <ToastMessageItem
          key={`toast-message-item-${toastMessage.id}`}
          toastMessage={toastMessage}
        ></ToastMessageItem>
      ))}
    </div>
  );
}
