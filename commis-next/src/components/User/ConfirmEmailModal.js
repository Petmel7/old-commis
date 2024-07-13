// import React, { useState } from 'react';
// import { confirmEmail } from '../../services/auth';
// import Modal from '../Modal/Modal';
// import styles from './styles/Auth.module.css';

// const ConfirmEmailModal = ({ show, onClose, onConfirm, email }) => {
//     const [comfirmEmail, setComfirmEmail] = useState('');

//     const handleConfirm = async () => {
//         try {
//             await confirmEmail({ comfirmEmail });
//         } catch (error) {
//             console.log('handleConfirm->error:', error);
//         }
//         onConfirm();
//     };

//     return (
//         <Modal show={show} onClose={onClose} title="Підтвердіть електронну пошту">
//             <div className={styles.confirmEmailContent}>
//                 <p>Ми надіслали код підтвердження на електронну пошту: {email}</p>
//                 {/* <input className={styles.authInput} type="text" value={comfirmEmail} onChange={e => setComfirmEmail(e.target.value)} placeholder="Введіть код" /> */}
//                 <button className={styles.authButton} onClick={handleConfirm}>Підтвердити</button>
//             </div>
//         </Modal>
//     );
// };

// export default ConfirmEmailModal;



import React from 'react';
import Modal from '../Modal/Modal';
import styles from './styles/Auth.module.css';

const ConfirmEmailModal = ({ show, onClose, email }) => {
    const googleMailUrl = `https://mail.google.com/mail/?authuser=${email}`;

    return (
        <Modal show={show} onClose={onClose} title="Підтвердіть електронну пошту">
            <div className={styles.confirmEmailContent}>
                <p>Ми надіслали посилання для підтвердження на електронну пошту: {email}</p>
                <a className={styles.authButton} href={googleMailUrl} target="_blank" rel="noopener noreferrer">
                    Перейти до пошти
                </a>
            </div>
        </Modal>
    );
};

export default ConfirmEmailModal;


