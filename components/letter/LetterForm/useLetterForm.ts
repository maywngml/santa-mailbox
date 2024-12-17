import { ChangeEvent, useState, useCallback, FormEvent } from 'react';
import type { LetterPayload } from '@/types/letter';
interface UseLetterFormProps {
  onSend: ({ email, content }: LetterPayload) => void;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useLetterForm({
  onSend,
  onSuccess,
  onError,
}: UseLetterFormProps) {
  const [email, setEmail] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend({ email, content });
  };

  return {
    email,
    content,
    handleEmailChange,
    handleContentChange,
    handleSubmit,
  };
}
