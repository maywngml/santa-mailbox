import LetterTextArea from '../LetterTextArea';

interface LetterViewProps {
  letter: string;
}

export default function LetterView({ letter }: LetterViewProps) {
  return (
    <LetterTextArea
      className='mt-8 lg:mt-6'
      isOutgoing={false}
      letter={letter}
    />
  );
}
