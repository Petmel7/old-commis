
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './styles/Auth.module.css';

const SellerButton = () => {
    const { isRegistered, isGoogleRegistered, user } = useAuth();

    return (
        <div>
            {!isRegistered && !isGoogleRegistered ? (
                <div className={styles.authButtonConteaner}>
                    <span className={styles.selerText}>Хочете стати продавцем?</span>
                    <Link href='/register'><button className={styles.selerButton}>Так</button></Link>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default SellerButton;