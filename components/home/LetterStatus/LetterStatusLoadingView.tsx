'use client';
import dynamic from 'next/dynamic';
import deerJson from '@/public/lottie/deer.json';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

export default function LetterStatusLoadingView() {
  return (
    <div>
      <Lottie
        loop
        animationData={deerJson}
        play
        style={{ width: 300, height: 300 }}
      ></Lottie>
      <p className='text-sm lg:text-lg'>
        산타 할아버지에게 편지를 보내는 중이예요 🦌
        <br className='block lg:hidden' />
      </p>
    </div>
  );
}
