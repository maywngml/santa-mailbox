import { ReactQueryProvider, ToastMessageProvider } from '@/providers';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <ToastMessageProvider>{children}</ToastMessageProvider>
    </ReactQueryProvider>
  );
}
