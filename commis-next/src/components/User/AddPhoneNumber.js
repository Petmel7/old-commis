
import React, { useState } from 'react';
import { addPhone } from '../../services/auth';
import Modal from '../Modal/Modal';
import styles from './styles/Auth.module.css';

const AddPhoneNumber = ({ show, onClose, onPhoneAdded, onPhoneConfirmed }) => {
    const [phone, setPhone] = useState('');

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPhone({ phone });
            onClose();
            onPhoneAdded();
            onPhoneConfirmed();
        } catch (error) {
            console.error(error);
        }
    };

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
                <button type='submit'>Додати</button>
            </form>
        </Modal>
    );
};

export default AddPhoneNumber;


