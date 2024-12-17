export interface ToastMessage {
  id: string;
  message: string;
}

export interface ToastMessageContextType {
  toastMessages: ToastMessage[];
  showToastMessage: (message: string) => void;
  removeToastMessage: (id: string) => void;
}
