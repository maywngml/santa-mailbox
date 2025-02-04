import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import { Layout } from '@/components/common';
import { ToastMessageContainer } from '@/components/ui';
import './globals.css';

const neoDgm = localFont({
  src: './fonts/neodgm.woff',
  variable: '--font-neodgm',
  weight: '100 900',
  display: 'block',
});

export const metadata: Metadata = {
  title: '산타 우체통',
  description:
    '산타 할아버지에게 편지를 써보세요. 크리스마스에 답장이 올지도 모른답니다?',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.santa-mailbox.site/',
    title: '산타 우체통',
    description:
      '산타 할아버지에게 편지를 써보세요. 크리스마스에 답장이 올지도 모른답니다?',
    images: [
      {
        url: '/images/open-graph-image.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${neoDgm.variable} antialiased`}>
        <Analytics />
        <Providers>
          <Layout>{children}</Layout>
          <ToastMessageContainer />
        </Providers>
      </body>
    </html>
  );
}
