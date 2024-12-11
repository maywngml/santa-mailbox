import Image from 'next/image';

export default function LetterStatusLoadingView() {
  return (
    <div>
      <Image
        src='/images/deer-christmas.gif'
        width={400}
        height={400}
        alt='목에 빨간 띠를 두르고 달려가는 루돌프'
      />
      <p className='mt-3 text-sm lg:mt-6 lg:text-lg'>
        산타 할아버지에게 편지를 보내는 중이예요 🦌
        <br className='block lg:hidden' />
      </p>
    </div>
  );
}
