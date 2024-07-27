import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { confirmPhone } from '../../services/auth';
import Modal from '../Modal/Modal';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/Auth.module.css';

const ConfirmPhoneModal = ({ show, onClose, phone }) => {
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);
    const router = useRouter();

    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await confirmPhone({ confirmationcode: confirm });

            router.push('/profile');

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        onClose();
    };

    if (loadingErrorComponent) return loadingErrorComponent;

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



