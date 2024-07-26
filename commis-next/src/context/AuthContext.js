import React, { createContext, useState, useContext, useEffect } from 'react';

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
