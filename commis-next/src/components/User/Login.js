
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { login } from '../../services/auth';
import GoogleAuth from './GoogleAuth';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/Auth.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { handleLogin } = useAuth();
    const router = useRouter();

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login({ email, password });
            handleLogin();
            router.push('/profile');
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <h2 className={styles.authHeading}>Увійти</h2>
            <input className={styles.authInput} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input className={styles.authInput} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
            <button className={styles.authButton} type="submit">Увійти</button>
            <GoogleAuth />
            <span className={styles.authText}>Немає аккаунта?</span>
            <Link href='/register'>Зареєструватися</Link>
        </form>
    );
};

export default Login;
