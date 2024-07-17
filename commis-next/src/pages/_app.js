
import React, { useState, useEffect } from 'react';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/Layout/Layout';
import AddPhoneNumber from '../components/User/AddPhoneNumber';
import ConfirmPhoneModal from '../components/User/ConfirmPhoneModal';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isGoogleRegistered, setIsGoogleRegistered] = useState(false);
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
    };

    const handleRegister = () => {
        setIsRegistered(true);
        localStorage.setItem('isRegistered', 'true');
    };

    const handleOpenPhoneModal = () => {
        setIsPhoneModalOpen(true);
    };

    const handleClosePhoneModal = () => {
        setIsPhoneModalOpen(false);
    };

    const handleOpenConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    const handlePhoneAdded = () => {
        handleOpenConfirmModal();
        handleClosePhoneModal();
    };

    return (
        <CartProvider>
            <Layout
                isAuthenticated={isAuthenticated}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                isRegistered={isRegistered}
            >
                <div className='container'>
                    <Component
                        {...pageProps}
                        isAuthenticated={isAuthenticated}
                        isRegistered={isRegistered}
                        isGoogleRegistered={isGoogleRegistered}
                        onLogin={handleLogin}
                        onRegister={handleRegister}
                        onPhoneAdded={handleOpenPhoneModal}
                        onPhoneConfirmed={handleOpenConfirmModal}
                        onLogout={handleLogout}
                        setGoogleRegistered={(value) => {
                            setIsGoogleRegistered(value);
                            localStorage.setItem('isGoogleRegistered', value.toString());
                        }}
                    />
                    <AddPhoneNumber
                        show={isPhoneModalOpen}
                        onClose={handleClosePhoneModal}
                        onPhoneConfirmed={handlePhoneAdded}
                    />
                    <ConfirmPhoneModal
                        show={isConfirmModalOpen}
                        onClose={handleCloseConfirmModal}
                    />
                </div>
            </Layout>
        </CartProvider>
    );
}

export default MyApp;


