import React, { useMemo, useState } from 'react';
import './activities.scss';
import { useSessionStore } from '@zustand/index';
import { MdGroupAdd } from "react-icons/md";
import { IoTrophySharp } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";


const ActivitiesC: React.FC = () => {
    const { session } = useSessionStore();
    const activities = session?.activities;

    const [filter, setFilter] = useState<string>('all');

    // Agrupar por tipo y contar
    const activityTypes = useMemo(() => {
        const counts: Record<string, number> = {};

        activities?.forEach(act => {
            counts[act.type] = (counts[act.type] || 0) + 1;
        });

        return counts;
    }, [activities]);

    // Filtrar actividades por tipo
    const filteredActivities = useMemo(() => {
        if (filter === 'all') return activities;
        return activities?.filter(act => act.type === filter);
    }, [filter, activities]);

    // Devuelve un label legible para un tipo de actividad
    const labelType = (type: string) => {
        switch (type) {
            case 'plan_purchase':
                return 'Planes';
            case 'new_referral':
                return 'Referidos';
            case 'commission_earned':
                return 'Comisiones';
            default:
                return 'Otro';
        }
    };

    // Devuelve un label legible para un tipo de actividad
    const IconType = (type: string) => {
        switch (type) {
            case 'plan_purchase':
                return <IoTrophySharp/>;
            case 'new_referral':
                return <MdGroupAdd/>;
            case 'commission_level':
                return <FaDollarSign/>;
            default:
                return 'Otro';
        }
    };


    return (
        <div className="activities_component">
            <h2>Actividades</h2>
            <div className="activity_filters">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    Todos ({activities?.length})
                </button>
                {Object.entries(activityTypes).map(([type, count]) => (
                    <button
                        key={type}
                        className={filter === type ? 'active' : ''}
                        onClick={() => setFilter(type)}
                    >
                        {labelType(type)} ({count})
                    </button>
                ))}
            </div>

            <ul className="activity_list">
                {(filteredActivities || []).length > 0 ? (
                    (filteredActivities || []).map((act, idx) => (
                        <li key={act.id || idx}>
                            <div className="box_icon">
                                {IconType(act.type)}
                            </div>
                            <p>{act.description}</p>
                        </li>
                    ))
                ) : (
                    <li>No hay actividades</li>
                )}
            </ul>
        </div>
    );
};

export default ActivitiesC;
