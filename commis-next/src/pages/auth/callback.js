
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';

const AuthCallback = () => {
    const { handleLogin, setGoogleRegisteredStatus } = useAuth();
    const router = useRouter();
    const { refreshToken } = router.query;

    useEffect(() => {
        const authenticate = async () => {
            try {
                localStorage.setItem('refreshToken', refreshToken);
                console.log('AuthCallback->refreshToken', refreshToken);
                handleLogin();

                const accessToken = localStorage.getItem('accessToken');
                console.log('AuthCallback->accessToken******', accessToken);

                const userProfile = await getUserProfile(accessToken);
                console.log('AuthCallback->userProfile$$$$', userProfile);

                router.push('/profile');

                if (userProfile.googleRegistered) {
                    setGoogleRegisteredStatus(true);
                    localStorage.setItem('isGoogleRegistered', 'true');
                } else {
                    setGoogleRegisteredStatus(false);
                    localStorage.setItem('isGoogleRegistered', 'false');
                }
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



