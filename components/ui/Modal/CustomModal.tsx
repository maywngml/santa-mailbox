import { ReactNode } from 'react';
import ModalOverlay from './ModalOverlay';
import ModalPortal from './ModalPortal';
import { useModal } from '@/hooks';

interface CustomModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  wrapperClassName?: string;
}

export default function CustomModal({
  children,
  isOpen,
  onClose,
  wrapperClassName,
}: CustomModalProps) {
  useModal({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className={`${wrapperClassName} fixed inset-0 z-50`}
        role='dialog'
        aria-modal='true'
      >
        <ModalOverlay onClose={onClose} />
        {children}
      </div>
    </ModalPortal>
  );
}
