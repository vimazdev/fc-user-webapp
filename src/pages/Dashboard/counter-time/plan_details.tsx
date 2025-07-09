import React from 'react';
import { type Plan } from '@mocks/buyPlans';
import { formatCurrency } from '@utils/formatCurrency';

type PlanDetailsProps = Plan & {
  onClick: (benefits: Plan['benefits']) => void;
};

const PlanDetails: React.FC<PlanDetailsProps> = ({
  label,
  price,
  save,
  popular,
  onClick,
  benefits
}) => {
  return (
    <div className={`plan_details ${popular ? 'popular' : ''}`} 
    onClick={() => onClick(benefits)}>
      <label>{label || 'Sin título'}</label>
      <p className='price'>{formatCurrency(price || 0)}</p>

      <button
        className='buy'
      >
        Comprar
      </button>

      {popular && <p className='isPopular'>Popular</p>}
      {save !== 0 ? (<p className='save'>Ahorras {formatCurrency(save || 0)}</p>) : null}
    </div>
  );
};

export default PlanDetails;
