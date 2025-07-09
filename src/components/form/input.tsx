import React from 'react';
import './form.scss';
import type { InputForm } from '../../types/type';

const Input: React.FC<InputForm> = (
    { type,
        label,
        placeholder,
        name,
        value,
        onChange,
        onClick,
        error, }
) => {

    const errorMessage = error?.[name];
    const valueInput = value?.[name]
    return (
        <div className="input-wrapper">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={valueInput}
                onChange={onChange}
                onClick={onClick}
                className={errorMessage ? "input-error" : ""}
                autoComplete='off'
            />
            <span className={`error-message ${errorMessage ? '' : 'hide'}`}>
                {errorMessage || ''}
            </span>
        </div>
    )
}

export default Input