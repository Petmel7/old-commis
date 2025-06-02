import { useState, useEffect } from 'react';
import { googleAuth } from '@/services/auth';
import { useRouter } from "next/router";
import GoogleIcon from '../../../public/img/google.svg';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/GoogleAuth.module.css';

const GoogleAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        const { error } = router.query;
        if (error === 'google-local-conflict') {
            alert('Цей акаунт зареєстрований вручну. Увійдіть з email і паролем.');
        }
    }, [router.query]);

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await googleAuth();
            setLoading(false);
        } catch (error) {
            console.error('Помилка автентифікації через Google', error);
            setError(error.message);
            setLoading(false);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div className={styles.googleAuthContainer}>
            <button className={styles.googleAuthButton} onClick={handleGoogleSignIn}>
                <div className={styles.googleAuthContent}>
                    <GoogleIcon className={styles.googleIcon} />
                    <p>Увійти через Google</p>
                </div>
            </button>
        </div>
    );
};

export default GoogleAuth;