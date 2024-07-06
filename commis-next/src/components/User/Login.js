import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../services/auth';
import styles from './styles/Auth.module.css';
import GoogleAuth from './GoogleAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            router.push('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <h2 className={styles.authHeading}>Логін</h2>
            <input className={styles.authInput} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input className={styles.authInput} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
            <button type="submit">Увійти</button>
            <GoogleAuth />
        </form>
    );
};

export default Login;
