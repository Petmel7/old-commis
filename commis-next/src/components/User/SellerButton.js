const { default: Link } = require("next/link");
import styles from './styles/Auth.module.css';

const SellerButton = ({ isRegistered, isGoogleRegistered }) => {
    console.log('SellerButton->isRegistered', isRegistered);
    console.log('SellerButton->isGoogleRegistered', isGoogleRegistered);

    return (
        <div>
            {!isRegistered && !isGoogleRegistered ? (
                <>
                    <span className={styles.authText}>Хочете стати продавцем?</span>
                    <Link className={styles.authButton} href='/register'><button>Так</button></Link>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default SellerButton;
