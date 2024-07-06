// import { useRouter } from 'next/navigation';
// import { logoutUser } from '../../services/auth';

// const Logout = () => {
//     const router = useRouter();

//     const handleLogout = async (e) => {
//         e.preventDefault();
//         try {
//             await logoutUser({ token });
//             console.log('token', token)
//             router.push('/login');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <button onClick={handleLogout}>Logout</button>
//     )
// }

// export default Logout;

import { useRouter } from 'next/navigation';
import { logoutUser } from '../../services/auth';

const Logout = () => {
    const router = useRouter();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in local storage');
                return;
            }
            const data = { token };
            console.log('Sending logout request with data:', data);
            await logoutUser(data);
            localStorage.removeItem('token');
            router.push('/register');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;


