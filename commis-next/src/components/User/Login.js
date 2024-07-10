
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../../services/auth';
import GoogleAuth from './GoogleAuth';
import styles from './styles/Auth.module.css';
import Link from 'next/link';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            onLogin();
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

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
