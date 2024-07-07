
// components/Header/Header.js
import React, { useState } from 'react';
import Link from 'next/link';
import { toggleMenu } from '../../utils/utils';
import styles from './styles/Header.module.css';

import Menu from '../../../public/menu.svg';
import Search from '../../../public/search.svg';
import Shopping from '../../../public/shopping.svg';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.searchContainer}>
                <button className={styles.burgerButton} onClick={() => toggleMenu(isOpen, setIsOpen)}>
                    <Menu />
                </button>
                <input type="text" className={styles.searchInput} placeholder="Пошук..." />
                <button className={styles.searchButton}>
                    <Search />
                </button>
                <button className={styles.cartButton}>
                    <Shopping />
                </button>
            </div>
            <nav className={`${styles.headerNav} ${isOpen ? styles.open : ''}`}>
                <Link className={styles.headerLink} href="/" onClick={() => toggleMenu(isOpen, setIsOpen)}>Головна</Link>
                <Link className={styles.headerLink} href="/login" onClick={() => toggleMenu(isOpen, setIsOpen)}>Увійти</Link>
                <Link className={styles.headerLink} href="/register" onClick={() => toggleMenu(isOpen, setIsOpen)}>Реєстрація</Link>
            </nav>
        </header>
    );
};

export default Header;
