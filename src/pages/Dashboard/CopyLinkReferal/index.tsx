import React, { useState } from 'react';
import './copyLinkReferal.scss';
import { useSessionStore } from '@zustand/index';
import { MdGroups3 } from "react-icons/md";

const CopyLinkReferal: React.FC = () => {
    const { session } = useSessionStore();
    const [copied, setCopied] = useState(false);

    const referralLink = `${window.location.origin}?ref=${session?.user.referral_code}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Oculta el mensaje después de 2s
        });
    };

    return (
        <div className='CopyLinkReferal'>
            <h3>Enlace de referido</h3>
            <div>
                <div className="box_icon">
                    <MdGroups3/>
                </div>
                <code>{referralLink}</code>
                <button onClick={handleCopy}>Copiar</button>
                {copied && <span className="copied-message">¡Copiado!</span>}
            </div>
        </div>
    );
};

export default CopyLinkReferal;
