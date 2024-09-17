
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './styles/Auth.module.css';

const SellerButton = () => {
    const { isRegistered, isGoogleRegistered } = useAuth();

    return (
        <div>
            {!isRegistered && !isGoogleRegistered ? (
                <div className={styles.authButtonConteaner}>
                    <span className={styles.authText}>Хочете стати продавцем?</span>
                    <Link href='/register'><button className={styles.authButton}>Так</button></Link>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default SellerButton;
