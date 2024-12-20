import { ChangeEvent, useState, useCallback, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { validate } from 'email-validator';
import { useToastMessageContext } from '@/providers/ToastMessageProvider';
import { checkEmailAndLetter } from '@/lib/emailAndLetter';
import { postVerificationEmail } from '@/lib/emailVerification';
import type { LetterPayload } from '@/types/letter';
interface UseLetterFormProps {
  onSend: (payload: LetterPayload) => void;
}

export default function useLetterForm({ onSend }: UseLetterFormProps) {
  const { showToastMessage } = useToastMessageContext();
  const checkOrSendLetter = useMutation({
    mutationFn: (email: string) => checkEmailAndLetter(email),
    onSuccess: (data) => {
      if (!data.isVerified) {
        showToastMessage('이메일 인증을 먼저 진행해주세요.');
      } else if (data.hasLetter) {
        showToastMessage(
          '이전에 작성한 편지가 있어요. 크리스마스에 메일함을 확인해주세요!'
        );
      } else {
        onSend({ email, name, content });
      }
    },
    onError: (error) => showToastMessage(error.message),
  });
  const sendVerificationEmail = useMutation({
    mutationFn: (email: string) => postVerificationEmail(email),
    onSuccess: () => {
      showToastMessage('인증 메일을 발송했습니다. 이메일 인증을 완료해주세요.');
    },
    onError: (error) => showToastMessage(error.message),
  });
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate(email)) {
      checkOrSendLetter.mutate(email);
    } else {
      showToastMessage('이메일 주소가 올바르지 않습니다.');
    }
  };

  const handleEmailVerify = () => {
    if (validate(email)) {
      sendVerificationEmail.mutate(email);
    } else {
      showToastMessage('이메일 주소가 올바르지 않습니다.');
    }
  };

  return {
    email,
    name,
    content,
    isVerifying: sendVerificationEmail.isPending,
    isSending: checkOrSendLetter.isPending,
    handleEmailChange,
    handleNameChange,
    handleContentChange,
    handleSubmit,
    handleEmailVerify,
  };
}
