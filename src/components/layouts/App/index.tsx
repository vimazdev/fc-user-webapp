import { getLocalData } from '@utils/localStorage.ts';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import Nav from '@components/layouts/Nav';
import Sidebar from '@components/layouts/Sidebar';
import { useSidebarStore } from '@zustand/sidebar.store';

const LayoutApp: React.FC = () => {
  const { isOpen } = useSidebarStore();
  const dataCurrent = getLocalData('dataCurrent');
  const isAuthenticated = Boolean(dataCurrent?.user.id);

  return (
    <div className='layout-app'>
      {isAuthenticated && <Sidebar />}
      <div className={`content ${isAuthenticated ? (isOpen ? 'active' : '') : ''}`}>
        {dataCurrent?.user.id && <Nav />}
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutApp;
