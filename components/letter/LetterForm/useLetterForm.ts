import { ChangeEvent, useState, useCallback, FormEvent } from 'react';
import { validate } from 'email-validator';
import { useToastMessageContext } from '@/providers/ToastMessageProvider';
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
  const { showToastMessage } = useToastMessageContext();
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
    if (!validate(email)) {
      showToastMessage('이메일 주소가 올바르지 않습니다.');
    } else {
      onSend({ email, content });
    }
  };

  return {
    email,
    content,
    handleEmailChange,
    handleContentChange,
    handleSubmit,
  };
}
