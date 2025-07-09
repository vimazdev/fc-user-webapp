import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSessionStore } from '@zustand/index';

const ProtectedRoute: React.FC = () => {

    const location = useLocation();
    // Se asegura de que se escuche el estado actual
    const session = useSessionStore((state) => state.session);

    const isAuthenticated = Boolean(session?.user?.id);
    const isAuthPage = location.pathname.startsWith('/auth');

    if (!isAuthenticated && !isAuthPage) {
        return <Navigate to="/auth" replace />;
    }

    if (isAuthenticated && isAuthPage) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
