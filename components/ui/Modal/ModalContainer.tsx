import { ReactNode } from 'react';
import ModalOverlay from './ModalOverlay';
import ModalPortal from './ModalPortal';
import { useModal } from '@/hooks';

interface ModalContainerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  keepMounted?: boolean;
  wrapperClassName?: string;
}

export default function ModalContainer({
  children,
  isOpen,
  onClose,
  keepMounted,
  wrapperClassName,
}: ModalContainerProps) {
  useModal({ isOpen, onClose });
  const visibilityClass = keepMounted ? (isOpen ? 'fixed' : 'hidden') : 'fixed';

  if (!keepMounted && !isOpen) return null;

  return (
    <ModalPortal>
      <div
        className={`${wrapperClassName} ${visibilityClass} inset-0 z-50`}
        role='dialog'
        aria-modal='true'
      >
        <ModalOverlay onClose={onClose} />
        {children}
      </div>
    </ModalPortal>
  );
}
