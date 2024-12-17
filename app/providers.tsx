import { ToastMessageProvider } from '@/providers';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <ToastMessageProvider>{children}</ToastMessageProvider>;
}
