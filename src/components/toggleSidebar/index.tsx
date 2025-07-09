import React from 'react';
import { useSidebarStore } from '@zustand/sidebar.store';
import './toggleSidebar.scss';

const ToggleSidebar: React.FC = () => {
    const { isOpen, setIsOpen } = useSidebarStore();
    return (
        <div id='sidebar-toggle' onClick={() => setIsOpen()} className={isOpen ? 'active' : ''}>
            <div className="content-line">
                <div className="line-h"></div>
                <div className="line-container">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        </div>
    )
}

export default ToggleSidebar