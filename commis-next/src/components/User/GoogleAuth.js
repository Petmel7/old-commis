// import { signIn, signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { googleAuth } from '../../services/auth';
// import styles from './styles/GoogleAuth.module.css';

// const GoogleAuth = () => {
//     const { data: session } = useSession();
//     const router = useRouter();

//     const handleGoogleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             const googleUser = await signIn('google');
//             if (googleUser) {
//                 await googleAuth({ googleUser });
//                 router.push('/profile');
//             }
//         } catch (error) {
//             console.error('Помилка автентифікації через Google', error);
//         }
//     };

//     return (
//         <div className={styles.googleAuthContainer}>
//             {session ? (
//                 <>
//                     <p className={styles.googleAuthName}>Привіт, {session.user.name}</p>
//                     <button onClick={() => signOut()}>Вийти</button>
//                 </>
//             ) : (
//                 <>
//                     <button onClick={handleGoogleSignIn}>Увійти через Google</button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default GoogleAuth;



// // import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { googleAuth } from '../../services/auth';
// import styles from './styles/GoogleAuth.module.css';

// const GoogleAuth = () => {
//     // const { data: session } = useSession();
//     const router = useRouter();

//     const handleGoogleSignIn = async (e) => {
//         e.preventDefault();
//         try {

//             const response = await googleAuth();
//             console.log('googleResponse', response);
//             router.push('/profile');

//         } catch (error) {
//             console.error('Помилка автентифікації через Google', error);
//         }
//     };

//     return (
//         <div className={styles.googleAuthContainer}>

//             <>
//                 <button onClick={handleGoogleSignIn}>Увійти через Google</button>
//             </>

//         </div>
//     );
// };

// export default GoogleAuth;





// import { signIn, signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import styles from './styles/GoogleAuth.module.css';

// const GoogleAuth = () => {
//     const { data: session } = useSession();
//     const router = useRouter();

//     const handleGoogleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             const googleUser = await signIn('google');
//             if (googleUser) {
//                 router.push('/profile');
//             }
//         } catch (error) {
//             console.error('Помилка автентифікації через Google', error);
//         }
//     };

//     return (
//         <div className={styles.googleAuthContainer}>
//             {session ? (
//                 <>
//                     <p className={styles.googleAuthName}>Привіт, {session.user.name}</p>
//                     <button onClick={() => signOut()}>Вийти</button>
//                 </>
//             ) : (
//                 <>
//                     <button onClick={handleGoogleSignIn}>Увійти через Google</button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default GoogleAuth;



import { useRouter } from 'next/router';
// import { useEffect } from 'react';
import styles from './styles/GoogleAuth.module.css';
import GoogleIcon from '../../../public/google.svg'

const GoogleAuth = () => {
    const router = useRouter();

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        window.location.href = 'http://localhost:5000/api/users/google';
    };

    // useEffect(() => {
    //     const { token } = router.query;
    //     if (token) {
    //         localStorage.setItem('token', token);
    //         router.push('/profile');
    //     }
    // }, [router]);

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



// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// const Auth = () => {
//     const router = useRouter();

//     useEffect(() => {
//         const { token } = router.query;
//         if (token) {
//             localStorage.setItem('token', token);
//             router.push('/profile');
//         }
//     }, [router]);

//     return <div>Redirecting...</div>;
// };

// export default Auth;



