
import React, { useState, useEffect } from 'react';
import useModal from '../../hooks/useModal';
import { addPhone } from '../../services/auth';
import Login from './Login';
import Modal from '../Modal/Modal';
import ConfirmPhoneModal from './ConfirmPhoneModal'; // новий компонент для підтвердження номера
import styles from './styles/Auth.module.css';

const AddPhoneNumber = ({ isAuthenticated, onLogin }) => {
    const [phone, setPhone] = useState('');
    const { isModalOpen, openModal, closeModal } = useModal();
    const { isModalOpen: isConfirmModalOpen, openModal: openConfirmModal, closeModal: closeConfirmModal } = useModal(); // додаємо нові хуки для підтвердження модального вікна
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            openModal();
        }
    }, [isAuthenticated]);

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPhone({ phone });
            closeModal();
            openConfirmModal(); // відкриваємо модальне вікно підтвердження номера телефону
        } catch (error) {
            console.error(error);
        }
    };

    const handleButtonClick = () => {
        if (isAuthenticated) {
            openModal();
        } else {
            setShowLogin(true);
        }
    };

    return (
        <>
            <span className={styles.authText}>Хочете стати продавцем?</span>
            <button className={styles.authButton} onClick={handleButtonClick}>Так</button>

            {isAuthenticated ? (
                <>
                    <Modal show={isModalOpen} onClose={closeModal} title="Додайте номер телефону">
                        <form className={styles.authForm} onSubmit={handlePhoneSubmit}>
                            <input
                                className={styles.authInput}
                                type="number"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder="Телефон"
                            />
                            <button type='submit'>Додати</button>
                        </form>
                    </Modal>
                    <ConfirmPhoneModal show={isConfirmModalOpen} onClose={closeConfirmModal} phone={phone} /> {/* новий компонент для підтвердження номера */}
                </>
            ) : (
                showLogin && <Login onLogin={onLogin} openModal={openModal} />
            )}
        </>
    );
};

export default AddPhoneNumber;

