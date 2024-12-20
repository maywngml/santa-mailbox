import type { ToastMessage } from '@/types/toastMessage';

interface ToastMessageItemProps {
  toastMessage: ToastMessage;
}

export default function ToastMessageItem({
  toastMessage,
}: ToastMessageItemProps) {
  const { id, message } = toastMessage;

  return (
    <div
      className='px-4 py-3 rounded-[10px] bg-light-green text-sm break-keep lg:p-4 lg:text-lg'
      key={`toast-message-${id}`}
    >
      <p>{message}</p>
    </div>
  );
}
