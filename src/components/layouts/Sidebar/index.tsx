import React, { useEffect, useRef, useState } from 'react';
import { getLocalData } from '@utils/localStorage.ts';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSessionStore } from '@zustand/index';
import { useSidebarStore } from '@zustand/sidebar.store';
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from '../../../assets/logo.png';
import './sidebar.scss';

import { nav } from './nav';
import { FaHeadset } from "react-icons/fa6";

const Sidebar: React.FC = () => {
    const { session } = useSessionStore();
    const { isOpen, setIsOpen } = useSidebarStore();
    const [isOpenLogo, setIsOpenLogo] = useState(false);
    const dataCurrent = getLocalData('dataCurrent');
    const sidebarRef = useRef<HTMLDivElement>(null);

    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('0px');

    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        if (isOpenLogo && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [isOpenLogo]);

    useEffect(() => {
        if (!isOpen) return;
        setIsOpenLogo(false);

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            const clickedOutsideSidebar = sidebarRef.current && !sidebarRef.current.contains(target);
            const clickedToggle = target.closest('#sidebar-toggle'); // <- Excepción

            if (clickedOutsideSidebar && !clickedToggle) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    return (
        <div
            id="sidebar"
            ref={sidebarRef}
            className={`sidebar ${session?.user.token && isOpen ? 'active' : ''}`}
        >
            <div className="content-sidebar">
                <div className={`header-sidebar-logo ${isOpenLogo ? 'active' : ''}`} onClick={() => setIsOpenLogo((prev) => !prev)}>

                    <div className="logo">
                        <img src={logo} alt="logo-sidebar" />
                    </div>
                    <h5>Faynex Capital</h5>
                    <div className="row">
                        <MdKeyboardArrowDown />
                    </div>

                    <div className="content-about-sidebar" ref={contentRef}
                        style={{ height }}>
                        <ul>
                            <li><Link to={'#'}>
                                <span><FaHeadset /></span> <span>Soporte</span>
                            </Link></li>
                        </ul>
                    </div>
                </div>

                <div className="content_nav_sidebar">
                    {nav.map((section) => (
                        <div key={section.category}>
                            <div className="divider">
                                <span>{section.category}</span>
                            </div>
                            <ul>
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        {
                                            item?.private && !dataCurrent?.user.id_plan ? (
                                                <Link to={'#'} className={`disabled ${pathname === item.href && dataCurrent?.user.id_plan ? 'active' : ''}`}>
                                                    {item.icon}
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <Link to={item.href} className={`${pathname === item.href && dataCurrent?.user.id_plan ? 'active' : ''}`} onClick={() => setIsOpen()}>
                                                    {item.icon}
                                                    {item.label}
                                                </Link>
                                            )
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
