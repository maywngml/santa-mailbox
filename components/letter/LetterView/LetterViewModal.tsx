import LetterPaperModal from '../LetterPaperModal';
import LetterView from './LetterView';

interface LetterViewModalProps {
  isOpen: boolean;
  letter: string;
  onClose: () => void;
}

export default function LetterViewModal({
  isOpen,
  letter,
  onClose,
}: LetterViewModalProps) {
  return (
    <LetterPaperModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <LetterView letter={letter}></LetterView>
    </LetterPaperModal>
  );
}
