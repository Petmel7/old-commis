
// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { register } from '../../services/auth';
// import GoogleAuth from './GoogleAuth';
// import styles from './styles/Auth.module.css';
// import Link from 'next/link';

// const Register = ({ onLogin }) => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const router = useRouter();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await register({ name, email, password });
//             onLogin(); // Викликаємо функцію для оновлення стану в Header
//             router.push('/login');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <form className={styles.authForm} onSubmit={handleSubmit}>
//             <h2 className={styles.authHeading}>Реєстрація</h2>
//             <input className={styles.authInput} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ім'я" />
//             <input className={styles.authInput} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
//             <input className={styles.authInput} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
//             <button className={styles.authButton} type="submit">Зареєструватися</button>
//             <GoogleAuth />
//             <span className={styles.authText}>Вже є аккаунт?</span>
//             <Link href='/login'>Увійти</Link>
//         </form>
//     );
// };

// export default Register;



import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '../../services/auth';
import GoogleAuth from './GoogleAuth';
import styles from './styles/Auth.module.css';
import Link from 'next/link';
import useModal from '../../hooks/useModal';
import ConfirmEmailModal from './ConfirmEmailModal';

const Register = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isModalOpen, openModal, closeModal } = useModal();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            openModal(); // Відкриваємо модальне вікно підтвердження електронної пошти
        } catch (error) {
            console.error(error);
        }
    };

    const handleConfirmEmail = () => {
        closeModal();
        router.push('/login'); // Після підтвердження перенаправляємо на сторінку логіну
    };

    return (
        <>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2 className={styles.authHeading}>Реєстрація</h2>
                <input className={styles.authInput} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ім'я" />
                <input className={styles.authInput} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input className={styles.authInput} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                <button className={styles.authButton} type="submit">Зареєструватися</button>
                <GoogleAuth />
                <span className={styles.authText}>Вже є аккаунт?</span>
                <Link href='/login'>Увійти</Link>
            </form>
            <ConfirmEmailModal show={isModalOpen} onClose={closeModal} onConfirm={handleConfirmEmail} email={email} />
        </>
    );
};

export default Register;


