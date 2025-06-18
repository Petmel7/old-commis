import { useState } from 'react';
import { addlastName } from '@/services/auth';
import Modal from "../Modal/Modal";
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/Auth.module.css';

const AddLastName = ({ show, onClose }) => {
    const [lastName, setlastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const validationLastName = () => {
        const errors = {};
        if (!lastName.trim()) {
            errors.lastName = "Введіть прізвище будь-ласка";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLastNameSubmit = async (e) => {
        e.preventDefault();

        if (!validationLastName()) return;

        setLoading(true);
        setError(null);
        try {
            await addlastName({ lastName });
            onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <Modal show={show} onClose={onClose} text='Додайте прізвище'>
            <div className={styles.modalContainer}>
                <form className={styles.authForm} onSubmit={handleLastNameSubmit}>
                    <input
                        className={`${styles.authInput} ${errors.lastName ? styles.errorInput : ''}`}
                        type="text"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        placeholder="Ваше прізвище"
                    />
                    {errors.lastName && <p className={styles.errorText}>{errors.lastName}</p>}
                    <button className={styles.authButton} type="submit">Додати</button>
                </form>
            </div>
        </Modal>
    )
}

export default AddLastName;