export type LetterStatusType = 'idle' | 'loading' | 'success' | 'failure';

export interface LetterPayload {
  email: string;
  name: string;
  content: string;
}
