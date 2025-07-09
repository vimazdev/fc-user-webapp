// utils/storage.ts
import type { UserStore } from '../types/type';

export const setLocalData = (key: string, value: UserStore) => {
    if (typeof window === 'undefined') return;
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error('Error al guardar en sessionStorage:', err);
    }
};

export const getLocalData = (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
        const stored = sessionStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
    } catch (err) {
        console.error('Error al obtener datos de sessionStorage:', err);
        return null;
    }
};

export const removeSessionData = (key: string) => {
    if (typeof window === 'undefined') return;
    try {
        sessionStorage.removeItem(key);
    } catch (err) {
        console.error('Error al eliminar datos del sessionStorage:', err);
    }
};
