При кліку на кнопку "Хочете стати продавцем? Так" Має відкритися форма з реєстрацією де потрібно ввести Імя, пошту, та пароль...

Після натискання на кнопку зареєструватися має відкритися модалка з пропозицією підтвердження пошти з посиланням перейти до пошти... 

Після натискання на яке має перенести на пошту де буде посилання з підтвердженням пошти...

Після натискання на яке повинно перенести на сторінку логування де після натискання на кнопку "Залогуватися" має відкритися модальне вікно з вводом номера телефону... 

Після вводу якого має відкритися модалка з підтвердженням коду для номера телефону...

Після вводу якого при успішному підтверджені має закритися модальне вікно та перенести на сторінку профілю.

======================================

Потрібно зробити коли користувач авторизується через google, щоб відкривалася модалка з додавання номера телефона, а після додавання відкривалась модалка з підтвердження номера.

======================================

Потрібно реалізувати в профілі опцію де будуть зберігатися додані продукти користувача

======================================

Потрібно в профілі реалізувати дві кнопки з переходами на дві сторінки, додати продукт і мої продукти

======================================

Потрібно додати кнопку купити для продуктів
Створити компонент кнопки і зарендерити її в кард

======================================

Потрібно створити замовлення

При кліку на кнопку купити, цей продукт має попасти в корзину

В корзині має бути кнопка збільшення кількості на один та зменшення

Ще має бути кнопка продовжити покупки

І кнопка продовжити замовлення

======================================


const OrderButton = () => {

    return (
        <button type="button" onClick={handleOder}>Купити</button>
    )
}

export default OrderButton;

=======================================

Потрібно реалізувати видалення продукту з корзини 

=======================================

Потрібно реалізувати при переході на profile такі перевірки: 

перевірити чи автентифікований користувач,
перевірити чи підтверджена електронна пошта, 
перевірити чи доданий номер телефону, 
перевірити чи підтверджений номер телефону

При позитивному результаті
якщо користувач не автентифікований, перейти на сторінку логін, а якщо автентифікований перевірити чи підтверджена електронна пошта, якщо підтверджена, перевірити чи доданий номер телефону, ящо доданий перевірити чи підтверджений номенр телефону, якщо підтверджений перейти на profile 

При негативному результаті
якщо користувач автинтифікований перевірити чи підтверджена електронна пошта, якщо не підтвердженна відкрити модальне вікно для підтвердження електронної пошти, перевірити чи доданий номер телефону якщо не доданий відкрити модальне вікно для додаваня номера телефону, перевірити чи підтверджений номер телефону, якщо не підтверджений відкрити модальне вікно для підтвердження номера телефону, після цього перейти на profile

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './styles/Header.module.css';
import SearchIcon from '../../../public/img/Search.svg';
import ProfileIcon from '../../../public/img/Profile.svg';
import CloseIcon from '../../../public/img/close.svg';

const AuthIcon = ({ isAuthenticated }) => {
    const profileLink = isAuthenticated ? '/profile' : '/login';
    const profileIconClass = isAuthenticated ? styles.authenticated : '';

    return (
        <Link href={profileLink}>
            <ProfileIcon
                className={`${styles.profileIcon} 
                ${profileIconClass}`}
            />
        </Link>
    )
};

const Header = ({ isAuthenticated }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearchClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.headerLogo}>Commis</h1>
                    <div className={styles.iconContainer}>
                        <button className={styles.searchButton} onClick={handleSearchClick}>
                            <SearchIcon className={styles.headerSearchIcon} />
                        </button>
                        <AuthIcon isAuthenticated={isAuthenticated} />
                    </div>
                </div>
            </header>
            <div className={`${styles.searchMenu} ${isMenuOpen ? styles.searchMenuOpen : ''}`}>
                <button className={styles.closeButton} onClick={handleCloseClick}>
                    <CloseIcon />
                </button>
                <input type="text" className={styles.searchInput} placeholder="Пошук..." />
            </div>
        </>
    );
};

export default Header;


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

import React, { useState } from 'react';
import { addPhone } from '../../services/auth';
import Modal from '../Modal/Modal';
import styles from './styles/Auth.module.css';

const AddPhoneNumber = ({ show, onClose, onPhoneConfirmed }) => {
    const [phone, setPhone] = useState('');

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPhone({ phone });
            onClose();
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

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { confirmPhone } from '../../services/auth';
import Modal from '../Modal/Modal';
import Loading from '../Loading/Loading';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import styles from './styles/Auth.module.css';

const ConfirmPhoneModal = ({ show, onClose, phone }) => {
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await confirmPhone({ confirmationcode: confirm });

            router.push('/profile');

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        onClose();
    };

    if (loading) return <Loading />
    if (error) return <ErrorDisplay error={error} />;

    return (
        <Modal show={show} onClose={onClose} title="Підтвердіть номер телефону">
            <div className={styles.confirmPhoneContent}>
                <p>Ми надіслали код підтвердження на номер: {phone}</p>
                <input className={styles.authInput} type="number" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Введіть код" />
                <button className={styles.authButton} onClick={handleConfirm}>Підтвердити</button>
            </div>
        </Modal>
    );
};

export default ConfirmPhoneModal;