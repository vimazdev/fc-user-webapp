import React, { useEffect, useState, type JSX } from 'react';
import './userProfileDashboard.scss';

// Icons
import { MdLocalFireDepartment } from "react-icons/md";
import { GiWingedSword } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";

// Types
import { type UserStore } from '../../../types/type';

// Store
import { useSessionStore } from '@zustand/index';
import { getLocalData } from '@utils/localStorage';


interface MetricItem {
  label: string;
  icon: JSX.Element;
  count?: number;
  total?: number;
}

const UserProfileDashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserStore | null>(null);
  const { session } = useSessionStore();

  useEffect(() => {
    const dataUser = getLocalData('dataCurrent') as UserStore | null;
    setUserData(dataUser);
  }, [session]);

  const commissions = userData?.commissions ?? [];
  const paymentRequests = userData?.payment_requests ?? [];

  const totalCommissions = commissions.reduce((acc, curr) => acc + (curr.amount ?? 0), 0);
  const totalRequested = paymentRequests.reduce((acc, curr) => acc + (curr.original_amount ?? 0), 0);
  const totalSaldo = totalCommissions - totalRequested;

  const dataDeploy: Record<string, MetricItem> = {
    plans: {
      label: 'Planes',
      count: userData?.plan?.length ?? 0,
      icon: <GiWingedSword />
    },
    commissions: {
      label: 'Comisiones',
      count: commissions.length,
      icon: <MdLocalFireDepartment />
    },
    referrals: {
      label: 'Referidos',
      count: Object.keys(userData?.user?.referrals ?? {}).length,
      icon: <FaPeopleGroup />
    },
    win: {
      label: 'Saldo Disponible',
      total: totalSaldo,
      icon: <MdOutlineAttachMoney />
    }
  };

  return (
    <div className='user-profile-container'>
      <div className="profile">
        {Object.entries(dataDeploy).map(([key, item]) => (
          <div className="item" key={key} id={key}>
            <div className="item_icon">{item.icon}</div>
            <div className="detail_item">
              <p>
                {item.count !== undefined && <span>{item.count}</span>}
                {item.total !== undefined && (
                  <span>{item.count !== undefined ? ' / ' : ''}${item.total.toFixed(2) + ' ' + 'USDT'}</span>
                )}
              </p>
              <h5>{item.label}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileDashboard;
