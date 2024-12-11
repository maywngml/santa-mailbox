interface ModalOverlayProps {
  onClose: () => void;
}

export default function ModalOverlay({ onClose }: ModalOverlayProps) {
  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-transparent-black'
      onClick={onClose}
    />
  );
}
