import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='p-4 bg-green lg:p-5'>
      <div className='flex mb-3 gap-x-2 items-center lg:mb-4'>
        <Image
          src='/images/logo.png'
          width={30}
          height={33}
          alt='산타 우체통 로고'
        />
        <p className='lg:text-lg'>산타 우체통</p>
      </div>
      <address className='text-xs not-italic lg:text-sm'>
        문의: sjuhee36@gmail.com
      </address>
      <p className='text-xs lg:text-sm'>
        본 사이트에 사용된 루돌프 이미지를 제외한 모든 아이콘의 저작권은 Freepik
        - Flaticon에 있습니다.
      </p>
      <p className='text-xs lg:text-sm'>
        BGM의 저작권은{' '}
        <Link
          className='underline'
          href='https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=264068'
          target='_blank'
        >
          Pixabay
        </Link>
        의{' '}
        <Link
          className='underline'
          href='https://pixabay.com/ko/users/top-flow-28521292/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=264068'
          target='_blank'
        >
          Sergio Prosvirini
        </Link>
        에게 있습니다.
      </p>
      <ul className='flex mt-3 gap-3 lg:gap-4'>
        <li
          className={`relative text-xs after:absolute after:-right-[9px] after:content-['|'] lg:text-sm lg:after:-right-3`}
        >
          <Link
            className='underline'
            href='https://santamailbox.super.site/%ea%b0%9c%ec%9d%b8%ec%a0%95%eb%b3%b4%ec%b2%98%eb%a6%ac%eb%b0%a9%ec%b9%a8'
            target='_blank'
          >
            개인정보처리방침
          </Link>
        </li>
        <li className='text-xs lg:text-sm'>
          <Link
            className='underline'
            href='https://santamailbox.super.site/%ec%84%9c%eb%b9%84%ec%8a%a4-%ec%9d%b4%ec%9a%a9%ec%95%bd%ea%b4%80'
            target='_blank'
          >
            서비스이용약관
          </Link>
        </li>
      </ul>
    </footer>
  );
}
