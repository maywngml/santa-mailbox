import { CustomModal } from './Modal';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

interface LetterPaperProps {
  isOutgoing: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function LetterPaper({
  isOutgoing,
  isOpen,
  onClose,
}: LetterPaperProps) {
  // TODO: 딱 ui만 담당하고 incomingLetter, outgoingLetter를 쪼개주면 좋을 것 같음
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName='flex items-end justify-center'
    >
      <div className='relative mx-auto px-5 w-[90vw] max-w-[1000px] h-[80vh] max-h-[1500px] rounded-tl-[20px] rounded-tr-[20px] bg-beige animate-letterSlideUp lg:w-[60vw]'>
        <XMarkIcon
          className='absolute top-4 right-4 hover:cursor-pointer'
          width={30}
          height={30}
          color='#B8771C'
          onClick={onClose}
        />
      </div>
    </CustomModal>
  );
}
