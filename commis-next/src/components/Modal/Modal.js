import React from 'react';
import styles from './styles/Modal.module.css';
import CloseIcon from '../../../public/img/close.svg';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.modalOnClose} onClick={onClose}>
                    <CloseIcon />
                </button>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
