
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthCallback = () => {
    const router = useRouter();
    const { refreshToken } = router.query;

    useEffect(() => {
        const authenticate = async () => {
            try {
                localStorage.setItem('token', refreshToken);
                console.log('AuthCallback->refreshToken', refreshToken);

                router.push('/add-phone');
            } catch (error) {
                console.error('Помилка авторизації через Google:', error);
            }
        };

        if (refreshToken) {
            authenticate();
        }
    }, [refreshToken, router]);

    return <div>Authorizing...</div>;
};

export default AuthCallback;
