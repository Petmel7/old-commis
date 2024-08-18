import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { confirmPhone } from '../../services/auth';
import Modal from '../Modal/Modal';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/Auth.module.css';

const ConfirmPhoneModal = ({ show, onClose, phone }) => {
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const { cart } = useCart();

    const loadingErrorComponent = useLoadingAndError(loading, error);
    const router = useRouter();

    const validationConfirmPhone = () => {
        const errors = {};

        if (!confirm.trim()) {
            errors.confirm = "Введіть код підтвердження телефону";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleConfirm = async (e) => {
        e.preventDefault();

        if (!validationConfirmPhone()) return;

        setLoading(true);
        setError(null);

        try {
            await confirmPhone({ confirmationcode: confirm });

            if (cart) {
                router.push('/placingAnOrder');
            } else {
                router.push('/profile');
            }

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        onClose();
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <Modal show={show} onClose={onClose} >
            <div className={styles.modalContainer}>
                <h3>Підтвердіть номер телефону</h3>
                <div className={styles.confirmPhoneContent}>

                    <p>Ми надіслали код підтвердження на номер: {phone}</p>

                    <input className={`${styles.authInput} ${errors.confirm ? styles.errorInput : ''}`} type="number" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Введіть код" />
                    {errors.confirm && <p className={styles.errorText}>{errors.confirm}</p>}

                    <button className={styles.authButton} onClick={handleConfirm}>Підтвердити</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmPhoneModal;



