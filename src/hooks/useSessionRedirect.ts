// src/hooks/useSessionRedirect.ts
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSessionStore } from '@zustand/index';
import { useSidebarStore } from '@zustand/sidebar.store';
export const useSessionRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthPage = location.pathname.startsWith('/auth');
    const { session } = useSessionStore();
    const { setIsOpen } = useSidebarStore();

    useEffect(() => {

        if (!session) {
            navigate('/auth', { replace: true });
            return;
        }

        const { user } = session;

        // ✅ Aquí defines tus condiciones
        if (user.account_status === 'inactive') {
            navigate('/account-disabled', { replace: true });
            return;
        }

        if (user && isAuthPage) {
            navigate('/dashboard', { replace: true });
            return;
        }


        setIsOpen(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, navigate, isAuthPage]);
};
