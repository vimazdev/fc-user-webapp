import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@router/ProtectedRoute';

import AuthPage from '@pages/AuthPage';
import HomePage from '@pages/HomePage';
import NotFound from '@pages/NotFound';
import Dashboard from '@pages/Dashboard';
import WalletPage from '@pages/WalletPage/WalletPage';
import LayoutApp from '@components/layouts/App';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Rutas públicas sin layout */}
                <Route path="/auth" element={<AuthPage />} />

                {/* Rutas que usan el layout */}
                <Route element={<LayoutApp />}>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/wallet" element={<WalletPage />} />

                        {/* Fallback */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
