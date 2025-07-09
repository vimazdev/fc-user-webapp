// src/store/useSessionStore.ts
import { create } from 'zustand';
import type { UserStore } from '../types/type';
import { getLocalData, setLocalData, removeSessionData } from '@utils/localStorage.ts';


interface SessionState {
  session: UserStore | null;
  setSession: (data: UserStore) => void;
  clearSession: () => void;
}

const STORAGE_KEY = 'dataCurrent';

export const useSessionStore = create<SessionState>()((set) => ({
  session: getLocalData(STORAGE_KEY) as UserStore | null,
  setSession: (data) => {
    set({ session: data });
    setLocalData(STORAGE_KEY, data);
  },
  clearSession: () => {
    set({ session: null });
    removeSessionData(STORAGE_KEY);
  },
}));
