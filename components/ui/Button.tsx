import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { LoadingSpinner } from '.';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

function Button({ className, children, isLoading, ...props }: ButtonProps) {
  const baseClassName = `${className} flex items-center justify-center py-2 bg-dark-green rounded-[10px] disabled:opacity-70 disabled:cursor-not-allowed lg:py-3`;

  return (
    <button
      className={baseClassName}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}

export default memo(Button);
