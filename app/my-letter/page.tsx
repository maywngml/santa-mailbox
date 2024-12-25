import { Suspense } from 'react';
import { MyLetterContent } from '@/components/letter';
import { LoadingSpinner } from '@/components/ui';

export default function MyLetter() {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep text-center '>
      <Suspense fallback={<LoadingSpinner />}>
        <MyLetterContent />
      </Suspense>
    </div>
  );
}
