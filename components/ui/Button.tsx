import { ButtonHTMLAttributes, ReactNode, memo } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

function Button({ className, children, isLoading }: ButtonProps) {
  const baseClassName = `${className} flex items-center justify-center py-2 rounded-[10px] lg:py-3`;

  return (
    <button className={baseClassName}>
      {isLoading ? (
        <svg
          className='animate-spin w-5 h-5 lg:w-6 lg:h-6'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
            fill='none'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}

export default memo(Button);
