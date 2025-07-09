import api from '@services/axios';
import type { User, Plan, Commission } from '../../types/type';

interface LoginPayload {
    email: string;
    password: string;
    confirmPass?: string;
    name?: string;
}

interface LoginResponse {
    success: boolean;
    data: {
        user: User;
        plan: Plan[];
        commissions: Commission[];
    };
    message: string;
}

export async function login(payload: LoginPayload, setSession: (data: any) => void): Promise<LoginResponse> {
    try {
        const response = await api.post<LoginResponse>('/auth/login', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { data } = response;

        if (data.success && data.data) {
            // Almacena la sesión en sessionStorage
            setSession(data.data);
        } else {
            console.warn('No se pudo iniciar sesión:', data.message);
        }

        return data;
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
}
