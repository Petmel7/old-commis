import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { googleAuth } from '../../services/auth';
import styles from './styles/GoogleAuth.module.css';

const GoogleAuth = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            const googleUser = await signIn('google');
            if (googleUser) {
                await googleAuth({ googleUser });
                router.push('/google');
            }
        } catch (error) {
            console.error('Помилка автентифікації через Google', error);
        }
    };

    return (
        <div className={styles.googleAuthContainer}>
            {session ? (
                <>
                    <p className={styles.googleAuthName}>Привіт, {session.user.name}</p>
                    <button onClick={() => signOut()}>Вийти</button>
                </>
            ) : (
                <>
                    <button onClick={handleGoogleSignIn}>Увійти через Google</button>
                </>
            )}
        </div>
    );
};

export default GoogleAuth;
