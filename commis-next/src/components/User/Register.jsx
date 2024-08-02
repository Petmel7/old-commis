
import React, { useState } from 'react';
import { register } from '../../services/auth';
import GoogleAuth from './GoogleAuth';
import styles from './styles/Auth.module.css';
import Link from 'next/link';
import useModal from '../../hooks/useModal';
import ConfirmEmailModal from './ConfirmEmailModal';
import useLoadingAndError from '../../hooks/useLoadingAndError';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isModalOpen, openModal, closeModal } = useModal();

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await register({ name, email, password });
            openModal();
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2 className={styles.authHeading}>Реєстрація</h2>
                <input className={styles.authInput} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ім'я" />
                <input className={styles.authInput} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input className={styles.authInput} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                <button className={styles.authButton} type="submit">Зареєструватися</button>
                <GoogleAuth />
                <span className={styles.authText}>Вже є аккаунт?</span>
                <Link href='/login'>Увійти</Link>
            </form>
            <ConfirmEmailModal show={isModalOpen} onClose={closeModal} email={email} />
        </>
    );
};

export default Register;


