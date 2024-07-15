
import React from 'react';
import Modal from '../Modal/Modal';
import styles from './styles/Auth.module.css';

const ConfirmEmailModal = ({ show, onClose, email }) => {
    const googleMailUrl = `https://mail.google.com/mail/?authuser=${email}`;

    return (
        <Modal show={show} onClose={onClose} title="Підтвердіть електронну пошту">
            <div className={styles.confirmEmailContent}>
                <p>Ми надіслали посилання для підтвердження на електронну пошту: {email}</p>
                <a className={styles.authButton} href={googleMailUrl} target="_blank" rel="noopener noreferrer">
                    Перейти до пошти
                </a>
            </div>
        </Modal>
    );
};

export default ConfirmEmailModal;


