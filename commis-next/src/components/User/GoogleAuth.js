
import { googleAuth } from '@/services/auth';
import GoogleIcon from '../../../public/img/google.svg';
import styles from './styles/GoogleAuth.module.css';

const GoogleAuth = () => {

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleAuth();
        } catch (error) {
            console.error('Помилка автентифікації через Google', error);
        }
    };

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



