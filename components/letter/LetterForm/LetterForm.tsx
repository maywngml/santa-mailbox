import { LetterTextArea } from '..';

export default function LetterForm() {
  return (
    <div className='h-full'>
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
    </div>
  );
}
