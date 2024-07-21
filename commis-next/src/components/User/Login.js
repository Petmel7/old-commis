
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { login } from '../../services/auth';
import GoogleAuth from './GoogleAuth';
import Loading from '../Loading/Loading';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import AddPhoneNumber from './AddPhoneNumber';
import ConfirmPhoneModal from './ConfirmPhoneModal';
import useModal from '../../hooks/useModal';
import styles from './styles/Auth.module.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isModalOpen: isAddPhoneModalOpen, openModal: openAddPhoneModal, closeModal: closeAddPhoneModal } = useModal();
    const { isModalOpen: isConfirmPhoneModalOpen, openModal: openConfirmPhoneModal, closeModal: closeConfirmPhoneModal } = useModal();
    // const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await login({ email, password });
            const user = response.user;
            onLogin();

            if (!user.phone) {
                openAddPhoneModal();
            } else if (!user.confirmphone) {
                openConfirmPhoneModal();
            }

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handlePhoneAdded = () => {
        closeAddPhoneModal();
        setLoading(true);
        openConfirmPhoneModal();
        setLoading(false);
    };

    if (loading) return <Loading />;
    if (error) return <ErrorDisplay error={error} />;

    return (
        <>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2 className={styles.authHeading}>Увійти</h2>
                <input className={styles.authInput} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input className={styles.authInput} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                <button className={styles.authButton} type="submit">Увійти</button>
                <GoogleAuth />
                <span className={styles.authText}>Немає аккаунта?</span>
                <Link href='/register'>Зареєструватися</Link>
            </form>
            <AddPhoneNumber show={isAddPhoneModalOpen} onClose={closeAddPhoneModal} onPhoneAdded={handlePhoneAdded} />
            <ConfirmPhoneModal show={isConfirmPhoneModalOpen} onClose={closeConfirmPhoneModal} />
        </>
    );
};

export default Login;
