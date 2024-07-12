
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { confirmPhone } from '../../services/auth';
import styles from './styles/Auth.module.css';

const ConfirmPhoneModal = ({ show, onClose, phone }) => {
    const [confirm, setConfirm] = useState('');

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
            await confirmPhone({ confirmationcode: confirm });
        } catch (error) {
            console.log('confirmPhone->error', error);
        }
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} title="Підтвердіть номер телефону">
            <div className={styles.confirmPhoneContent}>
                <p>Ми надіслали код підтвердження на номер: {phone}</p>
                <input className={styles.authInput} type="number" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Введіть код" />
                <button className={styles.authButton} onClick={handleConfirm}>Підтвердити</button>
            </div>
        </Modal>
    );
};

export default ConfirmPhoneModal;
