import { LetterTextArea } from '..';
import { Button } from '@/components/ui';
import useLetterForm from './useLetterForm';
import type { LetterPayload } from '@/types/letter';

interface LetterFormProps {
  onSend: (payload: LetterPayload) => void;
}

export default function LetterForm({ onSend }: LetterFormProps) {
  const {
    email,
    name,
    content,
    isLoading,
    handleEmailChange,
    handleNameChange,
    handleContentChange,
    handleSubmit,
  } = useLetterForm({ onSend });

  return (
    <form
      className='h-full'
      onSubmit={handleSubmit}
    >
      <div className='mb-2 lg:mb-[10px]'>
        <label className='inline-block w-[48px] mr-1 text-base text-dark-brown lg:mr-2 lg:w-[64px] lg:text-xl lg:leading-[20px]'>
          이메일
        </label>
        <input
          className='w-[70%] bg-transparent border-brown border-b-2 text-base text-dark-brown placeholder:text-light-brown lg:w-[80%] lg:text-xl lg:border-b-2'
          placeholder='답장을 받을 이메일을 입력해주세요'
          value={email}
          onChange={handleEmailChange}
        ></input>
      </div>
      <div>
        <label className='inline-block w-[48px] mr-1 text-base text-dark-brown lg:mr-2 lg:w-[64px] lg:text-xl lg:leading-[20px]'>
          이름
        </label>
        <input
          className='w-[70%] bg-transparent border-brown border-b-2 text-base text-dark-brown placeholder:text-light-brown lg:w-[80%] lg:text-xl lg:border-b-2'
          placeholder='이름을 입력해주세요'
          value={name}
          onChange={handleNameChange}
        ></input>
      </div>
      <LetterTextArea
        className='mt-2 lg:mt-[10px]'
        isOutgoing={true}
        value={content}
        onChange={handleContentChange}
      />
      <Button
        className='absolute left-1/2 bottom-3 w-24 -translate-x-1/2  text-base lg:w-[120px] lg:bottom-5 lg:text-lg'
        type='submit'
        isLoading={isLoading}
        disabled={!(email && name && content)}
      >
        작성 완료
      </Button>
    </form>
  );
}
