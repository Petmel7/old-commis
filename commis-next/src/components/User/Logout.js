
import React from 'react';
import { useRouter } from 'next/router';
import { logoutUser } from '../../services/auth';
import More from '../../../public/img/More.svg';
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal';
import styles from './styles/Auth.module.css';

const Logout = ({ onLogout }) => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            console.log('handleLogout->refreshToken', refreshToken);
            if (!refreshToken) {
                console.error('No refresh token found in local storage');
                return;
            }

            await logoutUser({ token: refreshToken });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            onLogout();
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleConfirmLogout = () => {
        handleLogout();
        closeModal();
    };

    return (
        <>
            <button className={styles.logoutButton} onClick={openModal}>
                <More className={styles.icon} />
            </button>

            <Modal show={isModalOpen} onClose={closeModal} title="Ви справді хочете вийти?">
                <div className={styles.modalButtons}>
                    <button onClick={handleConfirmLogout}>Так</button>
                    <button onClick={closeModal}>Ні</button>
                </div>
            </Modal>
        </>
    );
};

export default Logout;

