import { TextareaHTMLAttributes } from 'react';

interface LetterTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className: string;
  isOutgoing: boolean;
  letter?: string;
}

export default function LetterTextArea({
  className,
  isOutgoing,
  letter,
  ...props
}: LetterTextAreaProps) {
  if (isOutgoing) {
    return (
      <textarea
        className={`${className} w-full h-[68%] border-none text-base leading-[32px] text-dark-brown bg-mobile-lined-paper bg-[size:100%_32px] bg-local placeholder-light-brown resize-none lg:text-xl boreder-none lg:leading-[40px] lg:bg-pc-lined-paper lg:bg-[size:100%_40px]`}
        placeholder='산타할아버지에게 편지를 작성해보세요'
        disabled={false}
        maxLength={500}
        {...props}
      ></textarea>
    );
  } else {
    return (
      <textarea
        className={`${className} w-full h-[calc(100%-48px)] border-none text-base leading-[32px] text-dark-brown bg-mobile-lined-paper bg-[size:100%_32px] bg-local placeholder-light-brown resize-none lg:text-xl boreder-none lg:h-[calc(100%-64px)] lg:leading-[40px] lg:bg-pc-lined-paper lg:bg-[size:100%_40px]`}
        defaultValue={letter}
        disabled={true}
        {...props}
      ></textarea>
    );
  }
}
