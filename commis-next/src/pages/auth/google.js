import React, { useEffect, useState } from 'react';
import useLoadingAndError from '../../hooks/useLoadingAndError';

const GoogleAuth = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        try {
            window.location.href = 'http://localhost:5000/api/users/google';
        } catch (error) {
            setError('Redirect failed');
            setLoading(false);
        }
    }, []);

    if (loadingErrorComponent) return loadingErrorComponent;

};

export default GoogleAuth;

