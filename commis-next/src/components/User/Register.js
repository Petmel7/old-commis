import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../../services/auth';
import styles from './styles/Auth.module.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            <button type="submit">Зареєструватися</button>
        </form>
    );
};

export default Register;
