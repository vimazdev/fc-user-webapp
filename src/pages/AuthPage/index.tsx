import type { UserPayloadType } from '../../types/type';
import { loginFields, registerFields } from '@config/formAuth.config';
import { login } from '@services/auth/login.auth'
import { miniYup } from '@utils/miniYup'
import React, { useEffect, useState } from 'react';
import Input from '@components/form/input';
import logo from '../../assets/logo.png';
import { useSessionStore } from '@zustand/index';
import { useSessionRedirect } from '@hooks/useSessionRedirect';
import './auth.scss';

const InitPayload = {
    name: '',
    email: '',
    password: '',
    confirmPass: ''
}

const AuthPage: React.FC = () => {
    useSessionRedirect();
    const { setSession } = useSessionStore();
    const [inputErr, setInputErr] = useState<Record<string, string>>({});
    const [isLogin, setIsLogin] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [payload, setPayload] = useState<UserPayloadType>(InitPayload);

    const fieldsToRender = isLogin ? loginFields : registerFields;

    useEffect(() => {
        setIsActive(true)
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const schemaRegister = miniYup.object({
            email: miniYup.string().required().email("El correo no es valido"),
            name: miniYup.string().required().min(5, "Escribe tu nombre completo"),
            password: miniYup.string().required("La Contraseña es requerida").min(8, "La contraseña debe tener al menos 8 caracteres"),
            confimPass: miniYup.string().required("La Contraseña es requerida").min(8, "La contraseña debe tener al menos 8 caracteres").oneOfField('password'),
        });
        const schemaLogin = miniYup.object({
            email: miniYup.string().required().email("El correo no es valido"),
            password: miniYup.string().required("La Contraseña es requerida"),
        });

        const result = !isLogin ? schemaRegister.validate(payload) : schemaLogin.validate(payload);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        result.errors ? setInputErr(result.errors) : console.log(result);

        if (result.errors) {
            console.log(result.errors)
        } else {
            const result = await login(payload, setSession);
            console.log(result);
        }
    }

    return (
        <div className='auth-app'>
            <div className={`card-authenticate ${isActive ? '' : 'collapsed'}`}>
                <div className="logo-auth">
                    <img src={logo} alt="logo" />
                </div>
                <h3 style={{ textAlign: "center", width: '100%' }}>Faynex Capital</h3>


                <form onSubmit={handleSubmit} >
                    {/* Hola */}
                    {fieldsToRender.map((field) => (
                        <Input
                            key={field.name}
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            value={payload}
                            placeholder={field.placeholder}
                            onChange={(e) => {
                                setPayload((prev) => ({ ...prev, [field.name]: e.target.value }));
                                setInputErr({});
                            }}
                            error={inputErr}
                        />
                    ))}

                    <button type='submit' className='btn-submit'>{isLogin ? "Iniciar sesion" : "Registrar me"}</button>
                </form>

                <p>
                    {isLogin ? (
                        <>
                            ¿No tienes una cuenta? <button className='btn' onClick={() => { setIsLogin(!isLogin), setPayload(InitPayload) }}>Inscríbete</button>
                        </>
                    ) : (
                        <>
                            ¿Ya tienes una cuenta? <button className='btn' onClick={() => setIsLogin(!isLogin)} >Iniciar sesión</button>
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}

export default AuthPage