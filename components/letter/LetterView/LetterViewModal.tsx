'use client';
import { useRef } from 'react';
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';
import LetterPaperModal from '../LetterPaperModal';
import LetterView from './LetterView';
import { getHypenDate } from '@/lib/helpers';

interface LetterViewModalProps {
  isOpen: boolean;
  isReply: boolean;
  letter: string;
  onClose: () => void;
}

export default function LetterViewModal({
  isOpen,
  isReply,
  letter,
  onClose,
}: LetterViewModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawRoundedRect = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
  };

  const wrapText = (
    context: CanvasRenderingContext2D,
    letter: string,
    padding: number,
    maxWidth: number,
    height: number,
    lineHeight: number
  ) => {
    const lines = letter.split('\n');
    const wrappedLines: string[] = [];

    lines.forEach((paragraph) => {
      const words = paragraph.split(' ');
      let line = '';

      words.forEach((word) => {
        const textLine = line + word + ' ';
        const textWidth = context.measureText(textLine).width;

        if (textWidth > maxWidth && line.length > 0) {
          wrappedLines.push(line);
          line = word + ' ';
        } else {
          line = textLine;
        }
      });

      wrappedLines.push(line);
    });

    wrappedLines.forEach((line, index) => {
      context.fillText(line, padding, padding + index * lineHeight);
    });

    let index = 0;

    while (true) {
      const lineY = padding + index * lineHeight;
      const underlineY = lineY + lineHeight - 5;

      if (underlineY >= height - padding) {
        break;
      }

      console.log(underlineY);
      context.beginPath();
      context.moveTo(padding, underlineY);
      context.lineTo(padding + maxWidth, underlineY);
      context.lineWidth = 1;
      context.strokeStyle = '#8a5915';
      context.stroke();
      index++;
    }
  };

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const canvasWidth = 600;
    const canvasHeight =
      letter.length + 260 + (letter.match(/\n\n/g) || []).length * 33;
    const fontSize = 22;
    const fontFamily = 'neodgm';
    const lineHeight = fontSize * 1.5;
    const backgroundColor = '#fff5e1';
    const textColor = '#8a5915';
    const padding = 30;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = 'top';

    context.fillStyle = backgroundColor;
    drawRoundedRect(context, 0, 0, canvasWidth, canvasHeight, 20);
    context.clip();
    context.fill();

    context.fillStyle = textColor;
    wrapText(
      context,
      letter,
      padding,
      canvasWidth - padding * 2,
      canvasHeight,
      lineHeight
    );

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `산타우체통_${isReply ? '답장' : '내편지'}_${getHypenDate(
      new Date()
    )}.png`;
    link.click();
  };

  return (
    <LetterPaperModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ArrowDownTrayIcon
        className='absolute top-4 left-6 hover:cursor-pointer lg:top-6 lg:left-8'
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
