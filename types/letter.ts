import type { Letter } from '@/db/models/Letter';
export type LetterStatusType = 'idle' | 'loading' | 'success' | 'failure';

export interface LetterPayload {
  email: string;
  name: string;
  content: string;
}

export interface LetterResponse {
  success: boolean;
  letter: Letter;
}
