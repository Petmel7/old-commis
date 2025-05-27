
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './styles/Auth.module.css';

const SellerButton = () => {
    const { isRegistered, isGoogleRegistered, user } = useAuth();

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




// import { useRouter } from 'next/router';
// import { useAuth } from '@/context/AuthContext';
// import styles from './styles/Auth.module.css';

// const SellerButton = () => {
//     const { isRegistered, isGoogleRegistered, user } = useAuth();
//     const router = useRouter();

//     const handleClick = () => {
//         const registered = isRegistered || isGoogleRegistered;
//         if (!registered) {
//             router.push('/register');
//         } else {
//             router.push('/productAdd');
//         }
//     };

//     if (!user || user.role !== 'buyer') return null;

//     return (
//         <div className={styles.authButtonConteaner}>
//             <span className={styles.authText}>Хочете стати продавцем?</span>
//             <button className={styles.authButton} onClick={handleClick}>Так</button>
//         </div>
//     );
// };

// export default SellerButton;
