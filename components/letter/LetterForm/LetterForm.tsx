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
    isVerifying,
    isSending,
    handleEmailChange,
    handleNameChange,
    handleContentChange,
    handleEmailVerify,
    handleSubmit,
  } = useLetterForm({ onSend });

  return (
    <form
      className='h-full'
      onSubmit={handleSubmit}
    >
      <div className='flex h-10 items-center lg:mb-0 lg:h-[40px]'>
        <label className='inline-block w-[50px] mr-1 text-base text-dark-brown lg:mr-2 lg:w-[64px] lg:text-xl lg:leading-[20px]'>
          이메일
        </label>
        <input
          className='w-[calc(100%-118px)] bg-transparent border-brown border-b-2 text-base text-dark-brown placeholder:text-light-brown lg:w-[calc(100%-150px)] lg:text-xl lg:border-b-2'
          placeholder='이메일을 입력해주세요'
          value={email}
          onChange={handleEmailChange}
        ></input>
        <Button
          className='ml-2 py-[6px] w-[54px] text-base lg:w-[70px] lg:py-[6px] lg:text-lg'
          type='button'
          isLoading={isVerifying}
          onClick={handleEmailVerify}
        >
          인증
        </Button>
      </div>
      <div className='flex items-center h-10 lg:h-[40px]'>
        <label className='inline-block w-[50px] mr-1 text-base text-dark-brown lg:mr-2 lg:w-[64px] lg:text-xl lg:leading-[20px]'>
          이름
        </label>
        <input
          className='w-[calc(100%-52px)] bg-transparent border-brown border-b-2 text-base text-dark-brown placeholder:text-light-brown lg:w-[calc(100%-72px)] lg:text-xl lg:border-b-2'
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
        className='absolute left-1/2 bottom-4 w-24 -translate-x-1/2  text-base lg:w-[120px] lg:bottom-5 lg:text-lg'
        type='submit'
        isLoading={isSending}
        disabled={!(email && name && content)}
      >
        작성 완료
      </Button>
    </form>
  );
}
