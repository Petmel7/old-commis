
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';

const useCheckUserBlocked = () => {
    const { setUser, setIsBlocked } = useAuth();
    const [loadingBlocked, setLoadingBlocked] = useState(true);

    useEffect(() => {
        const checkBlocked = async () => {
            try {
                const profile = await getUserProfile();
                setUser(profile);
                setIsBlocked(profile?.is_blocked || false);
            } catch (error) {
                if (error.response?.status === 403) {
                    setIsBlocked(true);
                    setUser(null);
                }
            } finally {
                setLoadingBlocked(false);
            }
        };

        checkBlocked();
    }, []);

    return loadingBlocked;
};

export default useCheckUserBlocked;

