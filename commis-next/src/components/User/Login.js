
// components/Login.js
import React, { useState } from 'react';
import Link from 'next/link';
import { toggleMenu } from '../../utils/utils';
import { useRouter } from 'next/navigation';
import { login } from '../../services/auth';
import styles from './styles/Auth.module.css';
import GoogleAuth from './GoogleAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            router.push('/users/add-phone');
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
            <Link className={styles.headerLink} href="/register" onClick={() => toggleMenu(isOpen, setIsOpen)}>Реєстрація</Link>
        </form>
    );
};

export default Login;

