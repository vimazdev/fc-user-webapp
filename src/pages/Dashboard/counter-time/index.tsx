import React, { useState, useEffect, useMemo } from 'react';
import { useSessionStore } from '@zustand/index';
import { type PlanItem } from '../../../types/type';
import { useCountdown } from '@hooks/useCountdown';
import './counter-time.scss';

import PlanDetails from './plan_details';
import { buyPlans, type Benefit } from '@mocks/buyPlans';

import { FiCheckSquare } from "react-icons/fi";
import { GiCheckedShield } from "react-icons/gi";
import { FaRegHandPointer } from "react-icons/fa";

const CounterTimePlan: React.FC = () => {
    const { session } = useSessionStore();
    const [planActive, setPlanActive] = useState<PlanItem | null>(null);
    const [listPlans, setListPlans] = useState<Benefit | null>(buyPlans[0]?.benefits || null);

    // Obtener el ID del plan del usuario
    const planId = useMemo(() => session?.user.id_plan ?? null, [session]);

    // Buscar y establecer el plan activo
    useEffect(() => {
        if (session?.plan && Array.isArray(session.plan)) {
            const active = session.plan.find((item): item is PlanItem => item.id === planId && item.is_active === true);
            setPlanActive(active ?? null);
        } else {
            setPlanActive(null);
        }
    }, [session, planId]);

    // Fecha objetivo para el contador regresivo
    const targetDate = planActive?.plan_time_end ?? '';
    const { countdown, timeEnd } = useCountdown(targetDate);



    return (
        <div className="plan-counter">
            {/* <div className="plan-counter__add-plan">
                <div className="user_welcome">
                    <h3>{session?.user.full_name ? `Bienvenido/a ${session?.user.full_name}` : '--'}</h3>
                </div>
                <div className='active_plan'>
                    {planActive ? <span>ya cuentas con un plan activo</span> : null}
                    <button className={planActive !== null ? 'disabled' : ''}><TbTableOptions /> {!planActive ? 'Gestion de planes' : 'Tus planes'}</button>
                </div>
            </div> */}
            <div className={`plan-counter__time`}>
                {!planActive && (
                    <div className='title_plan'>
                        <div className="plan_logo">
                            <FaRegHandPointer />
                        </div>
                        <h1>Selecciona un plan.</h1>
                    </div>
                )}

                {
                    !planActive && (
                        <div className='hola'>
                            <div className={`card_detail__plan`}>
                                {buyPlans.map((item, index) => (
                                    <PlanDetails
                                        key={item.label || index}
                                        label={item.label}
                                        price={item.price}
                                        popular={item.popular ?? false}
                                        save={item.save ?? 0}
                                        benefits={item.benefits}
                                        onClick={(benefits) => { setListPlans(benefits ?? null); console.log(listPlans) }}
                                    />
                                ))}

                            </div>

                            <div className="listPlans">
                                {listPlans?.list.map((item, index) => (
                                    <p key={index}> <span><FiCheckSquare /></span>{item}</p>
                                ))}
                            </div>
                        </div>
                    )
                }


                {planActive && (
                    <div className='title_plan'>
                        <div className="plan_logo">
                            <GiCheckedShield />
                        </div>
                        <h1>{planActive.name}</h1>
                    </div>
                )}


                {planActive ?
                    <div className="time_end">
                        {(Object.keys(timeEnd) as (keyof typeof timeEnd)[]).map((key) => (
                            <div key={key} className="countdown__item">
                                <label>{timeEnd[key]}</label>
                                <p>{countdown[key]}</p>
                            </div>
                        ))}
                    </div>
                    : null
                }
            </div>
        </div>
    );
};

export default CounterTimePlan;
