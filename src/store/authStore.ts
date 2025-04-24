import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  showEmailSentMessage: boolean;
  setShowEmailSentMessage: (show: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(persist(
  (set) => ({
    showEmailSentMessage: false,
    setShowEmailSentMessage: (show) => set({ showEmailSentMessage: show }),
  }),
  {
    name: 'auth-storage',
  }
));
