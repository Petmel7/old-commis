
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { logoutUser } from '../../services/auth';
import LogoutIcon from '../../../public/img/logout.svg';
import styles from './styles/Auth.module.css';

const Logout = ({ onLogout }) => {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('token');
            if (!refreshToken) {
                console.error('No token found in local storage');
                return;
            }

            await logoutUser({ token: refreshToken });
            localStorage.removeItem('token');
            onLogout();
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmLogout = () => {
        handleLogout();
        handleCloseModal();
    };

    return (
        <>
            <button className={styles.logout} onClick={handleOpenModal}>
                <LogoutIcon />
            </button>
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Ви справді хочете вийти?</h2>
                        <div className={styles.modalButtons}>
                            <button onClick={handleConfirmLogout}>Так</button>
                            <button onClick={handleCloseModal}>Ні</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Logout;

