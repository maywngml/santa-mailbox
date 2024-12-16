import { ChangeEvent, useState, useCallback, FormEvent } from 'react';

interface UseLetterFormProps {
  onSend: () => void;
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

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 편지 작성 여부 확인, 전송 확인 모달 띄우기
    onSend();
  }, []);

  return {
    email,
    content,
    handleEmailChange,
    handleContentChange,
    handleSubmit,
  };
}
