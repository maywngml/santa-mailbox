import { FormEvent } from 'react';
import { LetterTextArea } from '..';
import { Button } from '@/components/ui';
import type { LetterStatusType } from '@/types/letter';

interface LetterFormProps {
  onSend: (status: LetterStatusType) => void;
}

export default function LetterForm({ onSend }: LetterFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend('idle');
  };

  return (
    <form
      className='h-full'
      onSubmit={handleSubmit}
    >
      <label className='mr-3 font-bold text-dark-brown lg:text-xl lg:leading-[20px]'>
        Email
      </label>
      <input
        className='w-[70%] bg-transparent border-brown border-b-2 text-sm text-dark-brown placeholder:text-light-brown lg:w-[80%] lg:text-xl lg:border-b-[3px]'
        placeholder='답장을 받을 이메일을 입력해주세요'
      ></input>
      <LetterTextArea
        className='mt-2 lg:mt-[10px]'
        isOutgoing={true}
      />
      <Button
        className='absolute left-1/2 bottom-3 w-24 -translate-x-1/2 bg-dark-green text-sm lg:w-[120px] lg:bottom-5 lg:text-lg'
        type='submit'
      >
        작성 완료
      </Button>
    </form>
  );
}
