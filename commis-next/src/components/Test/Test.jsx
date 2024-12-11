import React, { useEffect } from 'react';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';

const Test = () => {
    const { isModalOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        setTimeout(() => {
            openModal();
        }, 3000);
    }, []);

    return (
        <div>
            <Modal show={isModalOpen} onClose={closeModal}>
                <div>
                    Так то працює!
                </div>
            </Modal>
        </div>
    );
};

export default Test;
