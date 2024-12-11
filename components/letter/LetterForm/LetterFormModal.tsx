import LetterPaperModal from '../LetterPaperModal';
import LetterForm from './LetterForm';
import type { LetterStatusType } from '@/types/letter';

interface LetterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (status: LetterStatusType) => void;
}

export default function LetterFormModal({
  isOpen,
  onClose,
  onSend,
}: LetterFormModalProps) {
  return (
    <LetterPaperModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <LetterForm onSend={onSend}></LetterForm>
    </LetterPaperModal>
  );
}
