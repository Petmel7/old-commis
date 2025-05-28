
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { getUserProfile, confirmPhone } from '../../services/auth';
import Modal from '../Modal/Modal';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import useFetchData from '@/hooks/useFetchData';
import styles from './styles/Auth.module.css';

const ConfirmPhoneModal = ({ show, onClose }) => {
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const { cart } = useCart();
    const router = useRouter();

    const { data: user } = useFetchData(getUserProfile);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const validationConfirmPhone = () => {
        const errors = {};
        const userConfirmCode = user?.confirmation_code;

        if (!confirm.trim()) {
            errors.confirm = "Введіть код підтвердження телефону";
        } else if (confirm.length !== 6) {
            errors.confirm = "Код повинен містити 6 цифр";
        } else if (userConfirmCode && confirm !== userConfirmCode) {
            errors.confirm = "Неправильний код підтвердження";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        if (!validationConfirmPhone()) return;

        setLoading(true);
        setError(null);

        try {
            await confirmPhone({ confirmation_code: confirm });

            if (cart.length > 0) {
                router.push('/placingAnOrder');
            } else {
                router.push('/profile');
            }
            onClose();
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <Modal show={show} onClose={onClose} text='Підтвердіть номер телефону'>
            <div className={styles.modalContainer}>

                <div className={styles.confirmPhoneContent}>
                    <p className={styles.modalText}>Ми надіслали код підтвердження на номер: {user?.phone}</p>
                    <p className={styles.modalText}>На даний час ця функція не працює тому код підтвердження прийде вам на пошту</p>
                    <input
                        className={`${styles.authInput} ${errors.confirm ? styles.errorInput : ''}`}
                        type="number"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        placeholder="Введіть код"
                    />
                    {errors.confirm && <p className={styles.errorText}>{errors.confirm}</p>}
                    <button className={styles.authButton} onClick={handleConfirm}>Підтвердити</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmPhoneModal;



