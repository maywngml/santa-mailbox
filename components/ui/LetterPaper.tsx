interface LetterPaperProps {
  isOutgoing: boolean;
  isVisible: boolean;
  onClose: () => void;
}

export default function LetterPaper({
  isOutgoing,
  isVisible,
  onClose,
}: LetterPaperProps) {
  const handleOuterLayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains('outer-layer')) {
      onClose();
    }
  };

  return (
    <div
      className={`${
        isVisible ? 'block' : 'hidden'
      } outer-layer fixed flex top-0 left-0 justify-center items-end w-screen h-screen bg-transparent-black z-10`}
      onClick={handleOuterLayerClick}
    >
      <div className='w-[90%] max-w-[1000px] h-4/5 max-h-[1500px] rounded-tl-[20px] rounded-tr-[20px] bg-beige lg:w-3/5'></div>
    </div>
  );
}
