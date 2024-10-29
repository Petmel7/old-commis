import React from 'react';
import styles from './styles/Modal.module.css';
import CloseIcon from '../../../public/img/close.svg';

const Modal = ({ show, onClose, text, children }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.buttonContainer}>
                    <button className={styles.modalOnClose} onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <p className={styles.modalText}>{text}</p>
                {children}
            </div>
        </div>
    );
};

export default Modal;
