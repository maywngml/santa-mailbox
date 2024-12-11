import LetterPaperModal from '../LetterPaperModal';
import LetterForm from './LetterForm';

interface LetterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LetterFormModal({
  isOpen,
  onClose,
}: LetterFormModalProps) {
  return (
    <LetterPaperModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <LetterForm></LetterForm>
    </LetterPaperModal>
  );
}
