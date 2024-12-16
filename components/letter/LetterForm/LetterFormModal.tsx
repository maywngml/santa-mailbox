import LetterPaperModal from '../LetterPaperModal';
import LetterForm from './LetterForm';

interface LetterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
}

export default function LetterFormModal({
  isOpen,
  onClose,
  onSend,
}: LetterFormModalProps) {
  return (
    <LetterPaperModal isOpen={isOpen} onClose={onClose}>
      <LetterForm onSend={onSend}></LetterForm>
    </LetterPaperModal>
  );
}
