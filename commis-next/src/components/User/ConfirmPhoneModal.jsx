
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { getUserProfile, confirmPhone } from '../../services/auth';
import Modal from '../Modal/Modal';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/Auth.module.css';

const ConfirmPhoneModal = ({ show, onClose }) => {
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(null);
    const { cart } = useCart();
    const router = useRouter();

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await getUserProfile();
                setUser(userProfile);
            } catch (err) {
                setError('Не вдалося завантажити профіль користувача');
            }
        };

        fetchUserProfile();
    }, []);

    const validationConfirmPhone = () => {
        const errors = {};
        const userConfirmCode = user?.confirmationcode;

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
            await confirmPhone({ confirmationcode: confirm });
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
        <Modal show={show} onClose={onClose}>
            <div className={styles.modalContainer}>
                <h3>Підтвердіть номер телефону</h3>
                <div className={styles.confirmPhoneContent}>
                    <p className={styles.modalText}>Ми надіслали код підтвердження на номер: {user?.phone}</p>
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



