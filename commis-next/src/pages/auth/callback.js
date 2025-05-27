
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

    useEffect(() => {
        const authenticate = async () => {
            const { token, refreshToken } = router.query;

            if (!token || !refreshToken) return;

            try {
                localStorage.setItem('accessToken', token);
                localStorage.setItem('refreshToken', refreshToken);

                await handleLogin();

                const profile = await getUserProfile(token);

                const isGoogle = profile?.googleRegistered === true;
                setGoogleRegisteredStatus(isGoogle);

                localStorage.setItem('isGoogleRegistered', isGoogle.toString());

                router.push('/');
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (router.isReady) {
            authenticate();
        }
    }, [router.isReady]);

    if (loadingErrorComponent) return loadingErrorComponent;

    return null;
};

export default AuthCallback;
