import { Parisienne } from 'next/font/google';
import { BackgroundIcons, BgmController } from '@/components/common';
import type { ReactNode } from 'react';

const parisienne = Parisienne({ weight: '400', subsets: ['latin'] });

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section>
      <h1
        className={`${parisienne.className} mt-5 text-[40px] text-center lg:text-[110px]`}
      >
        Merry Christmas
      </h1>
      <BgmController />
      <BackgroundIcons />
      {children}
    </section>
  );
}
