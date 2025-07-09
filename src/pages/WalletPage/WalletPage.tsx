import React from 'react';
import './wallet.scss';

// Icons
import { IoWalletOutline } from "react-icons/io5";

const WalletPage: React.FC = () => {
  return (
    <div className='WalletPage'>
        <h2>Tu Billetera <IoWalletOutline /></h2>

        <div className="account-detail">
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default WalletPage