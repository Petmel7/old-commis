
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile } from '@/services/auth';

const AuthCallback = ({ onLogin, onPhoneAdded, setGoogleRegistered }) => {
    const router = useRouter();
    const { refreshToken } = router.query;

    useEffect(() => {
        const authenticate = async () => {
            try {
                localStorage.setItem('refreshToken', refreshToken);
                console.log('AuthCallback->refreshToken', refreshToken);
                onLogin();

                const accessToken = localStorage.getItem('accessToken');
                console.log('AuthCallback->accessToken******', accessToken);

                const userProfile = await getUserProfile(accessToken);
                console.log('AuthCallback->userProfile$$$$', userProfile);

                if (userProfile.phone) {
                    router.push('/');
                } else {
                    onPhoneAdded();
                }

                if (userProfile.googleRegistered) {
                    setGoogleRegistered(true);
                    localStorage.setItem('isGoogleRegistered', 'true');
                } else {
                    setGoogleRegistered(false);
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



