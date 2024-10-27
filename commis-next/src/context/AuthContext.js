import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isGoogleRegistered, setIsGoogleRegistered] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
        }
        const registered = localStorage.getItem('isRegistered') === 'true';
        if (registered) {
            setIsRegistered(true);
        }
        const googleRegistered = localStorage.getItem('isGoogleRegistered') === 'true';
        if (googleRegistered) {
            setIsGoogleRegistered(true);
        }
    }, []);

    const handleRegister = () => {
        setIsRegistered(true);
        localStorage.setItem('isRegistered', 'true');
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
    };

    const setGoogleRegisteredStatus = (value) => {
        setIsGoogleRegistered(value);
        localStorage.setItem('isGoogleRegistered', value.toString());
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isRegistered,
            isGoogleRegistered,
            handleLogin,
            handleLogout,
            handleRegister,
            setGoogleRegisteredStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
};




// import { createContext, useState, useContext, useEffect } from 'react';
// import { getUserProfile } from '../services/auth'; // Імпортуємо функцію отримання профілю

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isRegistered, setIsRegistered] = useState(false);
//     const [isGoogleRegistered, setIsGoogleRegistered] = useState(false);
//     const [user, setUser] = useState(null); // Стан для зберігання даних користувача
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const initializeAuth = async () => {
//             const accessToken = localStorage.getItem('accessToken');
//             if (accessToken) {
//                 setIsAuthenticated(true);
//                 await fetchUserProfile(); // Завантажуємо профіль, якщо є токен
//             }
//             const registered = localStorage.getItem('isRegistered') === 'true';
//             if (registered) {
//                 setIsRegistered(true);
//             }
//             const googleRegistered = localStorage.getItem('isGoogleRegistered') === 'true';
//             if (googleRegistered) {
//                 setIsGoogleRegistered(true);
//             }
//             setLoading(false); // Встановлюємо завантаження в false після ініціалізації
//         };

//         initializeAuth();
//     }, []);

//     const fetchUserProfile = async () => {
//         try {
//             const userProfile = await getUserProfile();
//             setUser(userProfile);
//         } catch (error) {
//             console.error('Помилка при завантаженні профілю користувача:', error);
//             setUser(null);
//         }
//     };

//     const handleRegister = () => {
//         setIsRegistered(true);
//         localStorage.setItem('isRegistered', 'true');
//     };

//     const handleLogin = async () => {
//         setIsAuthenticated(true);
//         await fetchUserProfile(); // Завантажуємо дані користувача після авторизації
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         setIsAuthenticated(false);
//         setUser(null); // Очищаємо дані користувача
//     };

//     const setGoogleRegisteredStatus = (value) => {
//         setIsGoogleRegistered(value);
//         localStorage.setItem('isGoogleRegistered', value.toString());
//     };

//     return (
//         <AuthContext.Provider value={{
//             isAuthenticated,
//             isRegistered,
//             isGoogleRegistered,
//             user,
//             loading,
//             handleLogin,
//             handleLogout,
//             handleRegister,
//             setGoogleRegisteredStatus
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

