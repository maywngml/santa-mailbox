'use client';
import { useRef } from 'react';
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wrapText = (
    context: CanvasRenderingContext2D,
    letter: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = letter.split(' ');
    let line = '';
    const lines = [];

    words.forEach((word) => {
      const textLine = line + word + ' ';
      const textWidth = context.measureText(textLine).width;

      if (textWidth > maxWidth && line.length > 0) {
        lines.push(line);
        line = word + ' ';
      } else {
        line = textLine;
      }
    });

    lines.push(line);
    lines.forEach((line, index) => {
      context.fillText(line, x, y + index * lineHeight);
    });

    return lines.length * lineHeight;
  };

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const canvasWidth = 600;
    const canvasHeight = 750;
    const fontSize = 22;
    const fontFamily = 'neodgm';
    const lineHeight = fontSize * 1.5;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = 'top';

    const backgroundColor = '#fff5e1';
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    const textColor = '#8a5915';
    context.fillStyle = textColor;
    wrapText(context, letter, 10, 10, canvasWidth - 20, lineHeight);

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = '산타우체통.png';
    link.click();
  };

  return (
    <LetterPaperModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ArrowDownTrayIcon
        className='absolute top-4 left-6 hover:cursor-pointer lg:top-6'
        color='#B8771C'
        width={30}
        height={30}
        onClick={handleDownloadClick}
      />
      <canvas
        id='canvas'
        className='hidden'
        ref={canvasRef}
      />
      <LetterView letter={letter}></LetterView>
    </LetterPaperModal>
  );
}
