import { Suspense } from 'react';
import { MailboxContent } from '@/components/mailbox';
import { LoadingSpinner } from '@/components/ui';

export default function Mailbox() {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] break-keep text-center '>
      <div className='mobile:w-[90vw] mobile:max-w-[400px] flex flex-col items-center gap-3'>
        <Suspense fallback={<LoadingSpinner />}>
          <MailboxContent />
        </Suspense>
      </div>
    </div>
  );
}
