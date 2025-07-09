import React, { useState, useEffect } from 'react';
import ToggleSidebar from '@components/toggleSidebar';
import logo from '../../../assets/logo.png'
import { LuSettings } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSessionStore } from '@zustand/index';
import './nav.scss';

// Store
import { getLocalData } from '@utils/localStorage';
import { type UserStore } from '../../../types/type';

const Nav: React.FC = () => {
    const { clearSession, session } = useSessionStore();
    const firstLetter = session?.user?.full_name?.charAt(0)?.toUpperCase() || 'N';

    const [userData, setUserData] = useState<UserStore | null>(null);

    useEffect(() => {
        const dataUser = getLocalData('dataCurrent') as UserStore | null;
        setUserData(dataUser);
    }, [session]);

    const commissions = userData?.commissions ?? [];
    const paymentRequests = userData?.payment_requests ?? [];

    const totalCommissions = commissions.reduce((acc, curr) => acc + (curr.amount ?? 0), 0);
    const totalRequested = paymentRequests.reduce((acc, curr) => acc + (curr.original_amount ?? 0), 0);
    const totalSaldo = totalCommissions - totalRequested;


    return (
        <div className='nav'>
            <ToggleSidebar />

            <div className="avatar">
                <div className="card-detail-user">
                    <h5>{session?.user.full_name || 'Null'}</h5>
                    <p>${totalSaldo.toFixed(2)} USDT</p>
                </div>
                <div className="card-logo-name">
                    <span>{firstLetter}</span>
                    <div className="ensign">
                        <img src={logo} alt="ensign" />
                    </div>
                </div>
                <div className="card-icons">
                    <div className="activity_notify">
                        <div className="item-icon">
                            <LuSettings />
                        </div>
                        <div className="item-icon">
                            <RiLogoutCircleLine onClick={() => clearSession()} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Nav