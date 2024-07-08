import { useEffect } from 'react';

const GoogleAuth = () => {
    useEffect(() => {
        window.location.href = 'http://localhost:5000/api/users/google';
    }, []);

    return <div>Redirecting to Google...</div>;
};

export default GoogleAuth;
