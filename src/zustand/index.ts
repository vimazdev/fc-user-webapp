// src/store/useSessionStore.ts
import { create } from 'zustand';
import type { User, Plan, Commission, Payment_requests, Activities } from '../types/type';
import { getLocalData, setLocalData, removeSessionData } from '@utils/localStorage.ts';

interface SessionData {
    user: User;
    plan: Plan[];
    commissions: Commission[];
    activities: Activities[] | undefined;
    payment_requests: Payment_requests[];
}

interface SessionState {
    session: SessionData | null;
    setSession: (data: SessionData) => void;
    clearSession: () => void;
}

// Clave en storage
const STORAGE_KEY = 'dataCurrent';

export const useSessionStore = create<SessionState>((set) => ({
    session: getLocalData(STORAGE_KEY),
    setSession: (data) => {
        setLocalData(STORAGE_KEY, data);
        set({ session: data });
    },
    clearSession: () => {
        removeSessionData(STORAGE_KEY);
        set({ session: null });
    },
}));
