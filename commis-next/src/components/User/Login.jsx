
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { login } from '../../services/auth';
import { validateEmail, validatePassword } from '@/utils/validation';
import GoogleAuth from './GoogleAuth';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/Auth.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { handleLogin, isRegistered } = useAuth();
    const router = useRouter();

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const validateForm = () => {
        const emailErrors = validateEmail(email);
        const passwordErrors = validatePassword(password);
        const errors = { ...emailErrors, ...passwordErrors };
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isRegistered) {
            alert('Ви ще не зареєстровані зареєструйтесь будь-ласка.');
            router.push('/register');
            return;
        }

        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            await login({ email, password });
            handleLogin();
            router.push('/profile');
        } catch (error) {
            const msg = error.message;

            if (msg.includes('Google')) {
                alert(msg);
            } else {
                setError(msg);
            }

            setLoading(false);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div className="authWrapper">
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2 className={styles.authHeading}>Увійти</h2>

                <input className={`${styles.authInput} ${errors.email ? styles.errorInput : ''}`} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}

                <input className={`${styles.authInput} ${errors.password ? styles.errorInput : ''}`} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                {errors.password && <p className={styles.errorText}>{errors.password}</p>}

                <button className={styles.authButton} type="submit">Увійти</button>
                <GoogleAuth />
                <span className={styles.authText}>Немає аккаунта?</span>
                <Link href='/register'>Зареєструватися</Link>
            </form>
        </div>
    );
};

export default Login;
