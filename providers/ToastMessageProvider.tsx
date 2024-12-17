'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import type {
  ToastMessage,
  ToastMessageContextType,
} from '@/types/toastMessage';

const ToastMessageContext = createContext<ToastMessageContextType | null>(null);

export function ToastMessageProvider({ children }: { children: ReactNode }) {
  const [toastMessages, setToastMessages] = useState<ToastMessage[]>([]);
  const timeoutIds = useRef<Set<NodeJS.Timeout>>(new Set<NodeJS.Timeout>());

  const removeToastMessage = useCallback((id: string) => {
    setToastMessages((prevToastMessages) =>
      prevToastMessages.filter((toastMessage) => toastMessage.id !== id)
    );
  }, []);

  const showToastMessage = useCallback(
    (message: string) => {
      const id = Math.random().toString(36).substring(7);

      if (
        toastMessages.some((toastMessage) => toastMessage.message === message)
      ) {
        return;
      }

      setToastMessages((prevToastMessages) => [
        ...prevToastMessages,
        { id, message },
      ]);

      const timeoutId = setTimeout(() => {
        removeToastMessage(id);
        timeoutIds.current.delete(timeoutId);
      }, 3000);

      timeoutIds.current.add(timeoutId);
    },
    [toastMessages, removeToastMessage]
  );

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <ToastMessageContext.Provider
      value={{ toastMessages, showToastMessage, removeToastMessage }}
    >
      {children}
    </ToastMessageContext.Provider>
  );
}

export const useToastMessageContext = () => {
  const context = useContext(ToastMessageContext);
  if (!context) {
    throw new Error(
      'useToastMessageContext must be used within ToastMessageProvider'
    );
  }
  return context;
};
