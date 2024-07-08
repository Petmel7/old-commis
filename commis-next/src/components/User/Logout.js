
import { useRouter } from 'next/navigation';
import { logoutUser } from '../../services/auth';

const Logout = () => {
    const router = useRouter();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const refreshToken = localStorage.getItem('token');
            console.log('Logout->refreshToken', refreshToken);
            if (!refreshToken) {
                console.error('No token found in local storage');
                return;
            }

            await logoutUser({ token: refreshToken });
            localStorage.removeItem('token');
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;