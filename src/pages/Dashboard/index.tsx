import React from 'react';
import './dashboard.scss';
import CounterTimePlan from './counter-time';
import UserProfileDashboard from './UserProfileDashboard';
import ActivitiesC from './Activities/ActivitiesC';
import { useSessionStore } from '@zustand/index';
import CopyLinkReferal from './CopyLinkReferal';

const Dashboard: React.FC = () => {
  const { session } = useSessionStore();
  console.log(session?.user.id_plan);
  return (
    <div className="content_view">
      <CopyLinkReferal/>
      <UserProfileDashboard/>
      <CounterTimePlan />
      <ActivitiesC/>
    </div>
  );
};

export default Dashboard;
