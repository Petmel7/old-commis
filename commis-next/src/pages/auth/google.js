import { useEffect, useState } from 'react';
import { getServerUrl } from '@/utils/env';
import useLoadingAndError from '../../hooks/useLoadingAndError';

const GoogleAuth = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        try {
            window.location.href = `${getServerUrl()}/api/users/google`;
        } catch (error) {
            setError('Redirect failed');
            setLoading(false);
        }
    }, []);

    if (loadingErrorComponent) return loadingErrorComponent;

};

export default GoogleAuth;

