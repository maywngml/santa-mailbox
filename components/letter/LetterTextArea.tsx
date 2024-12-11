import { TextareaHTMLAttributes } from 'react';

interface LetterTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isOutgoing: boolean;
}

export default function LetterTextArea({
  isOutgoing,
  ...props
}: LetterTextAreaProps) {
  return (
    <textarea
      className='w-full h-4/5 border-none text-sm leading-[28px] text-dark-brown bg-mobile-lined-paper bg-[size:100%_28px] placeholder-light-brown lg:text-xl boreder-none lg:leading-[40px] lg:bg-pc-lined-paper lg:bg-[size:100%_40px]'
      placeholder={isOutgoing ? '산타할아버지에게 편지를 작성해보세요' : ''}
      disabled={!isOutgoing}
      {...props}
    ></textarea>
  );
}
