
import React, { useState } from 'react';
import { addPhone } from '../../services/auth';
import Modal from '../Modal/Modal';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/Auth.module.css';

const AddPhoneNumber = ({ show, onClose, onPhoneAdded }) => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await addPhone({ phone });
            onClose();
            onPhoneAdded();
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <Modal show={show} onClose={onClose} title="Додайте номер телефону">
            <form className={styles.authForm} onSubmit={handlePhoneSubmit}>
                <input
                    className={styles.authInput}
                    type="number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Телефон"
                />
                <button className={styles.authButton} type='submit'>Додати</button>
            </form>
        </Modal>
    );
};

export default AddPhoneNumber;