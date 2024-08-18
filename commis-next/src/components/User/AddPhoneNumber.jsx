
import React, { useState } from 'react';
import { addPhone } from '../../services/auth';
import Modal from '../Modal/Modal';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/Auth.module.css';

const AddPhoneNumber = ({ show, onClose, onPhoneAdded }) => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const validationPhone = () => {
        const errors = {};

        if (!phone.trim()) {
            errors.phone = "Введіть свій номер телефону";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();

        if (!validationPhone()) return;

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
        <Modal show={show} onClose={onClose} >
            <div className={styles.modalContainer}>
                <h3>Додайте номер телефону</h3>
                <form className={styles.authForm} onSubmit={handlePhoneSubmit}>
                    <input
                        className={`${styles.authInput} ${errors.phone ? styles.errorInput : ''}`}
                        type="number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Телефон"
                    />
                    {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
                    <button className={styles.authButton} type='submit'>Додати</button>
                </form>
            </div>
        </Modal>
    );
};

export default AddPhoneNumber;