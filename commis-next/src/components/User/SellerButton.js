
import Link from 'next/link';
import styles from './styles/Auth.module.css';

const SellerButton = ({ isRegistered, isGoogleRegistered }) => {
    console.log('SellerButton->isRegistered', isRegistered);
    console.log('SellerButton->isGoogleRegistered', isGoogleRegistered);

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


