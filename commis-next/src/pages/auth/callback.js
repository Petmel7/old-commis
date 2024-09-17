import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';
import useLoadingAndError from '../../hooks/useLoadingAndError';

const AuthCallback = () => {
    const { handleLogin, setGoogleRegisteredStatus } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadingErrorComponent = useLoadingAndError(loading, error);
    const router = useRouter();
    const { refreshToken } = router.query;

    useEffect(() => {
        const authenticate = async () => {
            try {
                localStorage.setItem('refreshToken', refreshToken);

                handleLogin();

                const accessToken = localStorage.getItem('accessToken');

                const userProfile = await getUserProfile(accessToken);

                if (userProfile.googleRegistered) {
                    setGoogleRegisteredStatus(true);
                    localStorage.setItem('isGoogleRegistered', 'true');
                } else {
                    setGoogleRegisteredStatus(false);
                    localStorage.setItem('isGoogleRegistered', 'false');
                }

                setLoading(false);
                router.push('/profile');
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (refreshToken) {
            authenticate();
        }
    }, [refreshToken, router]);

    if (loadingErrorComponent) return loadingErrorComponent;

    return null;
};

export default AuthCallback;




