import React, { useState } from 'react';
import Link from 'next/link';
import { toggleMenu } from '../../utils/utils';
import { useRouter } from 'next/navigation';
import { register } from '../../services/auth';
import GoogleAuth from './GoogleAuth';
import styles from './styles/Auth.module.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            router.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <h2 className={styles.authHeading}>Реєстрація</h2>
            <input className={styles.authInput} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ім'я" />
            <input className={styles.authInput} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input className={styles.authInput} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
            <button className={styles.authButton} type="submit">Зареєструватися</button>
            <GoogleAuth />
            <Link className={styles.headerLink} href="/login" onClick={() => toggleMenu(isOpen, setIsOpen)}>Увійти</Link>
        </form>
    );
};

export default Register;
