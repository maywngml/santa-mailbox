import { ChangeEvent, useState, useCallback, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { validate } from 'email-validator';
import { useToastMessageContext } from '@/providers/ToastMessageProvider';
import { getLetter } from '@/api/letter';
import type { LetterPayload } from '@/types/letter';
interface UseLetterFormProps {
  onSend: ({ email, content }: LetterPayload) => void;
}

export default function useLetterForm({ onSend }: UseLetterFormProps) {
  const { showToastMessage } = useToastMessageContext();
  const mutation = useMutation({
    mutationFn: (email: string) => getLetter(email),
    onSuccess: (data) => {
      if (data.hasLetter) {
        showToastMessage(
          '이전에 작성한 편지가 있어요. 크리스마스에 메일함을 확인해주세요!'
        );
      } else {
        onSend({ email, content });
      }
    },
    onError: (error) => showToastMessage(error.message),
  });
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
      mutation.mutate(email);
    }
  };

  return {
    email,
    content,
    isLoading: mutation.isPending,
    handleEmailChange,
    handleContentChange,
    handleSubmit,
  };
}
