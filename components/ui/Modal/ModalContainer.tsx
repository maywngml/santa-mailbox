import { ReactNode } from 'react';
import ModalOverlay from './ModalOverlay';
import ModalPortal from './ModalPortal';
import { useModal } from '@/hooks';

interface ModalContainerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  wrapperClassName?: string;
}

export default function ModalContainer({
  children,
  isOpen,
  onClose,
  wrapperClassName,
}: ModalContainerProps) {
  useModal({ isOpen, onClose });

  return (
    <ModalPortal>
      <div
        className={`${wrapperClassName} ${
          isOpen ? 'fixed' : 'hidden'
        } inset-0 z-50`}
        role='dialog'
        aria-modal='true'
      >
        <ModalOverlay onClose={onClose} />
        {children}
      </div>
    </ModalPortal>
  );
}
