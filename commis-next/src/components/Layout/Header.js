
// components/Header/Header.js
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './styles/Header.module.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.searchContainer}>
                <button className={styles.burgerButton} onClick={toggleMenu}>
                    ☰
                </button>
                <input type="text" className={styles.searchInput} placeholder="Пошук..." />
                <button className={styles.searchButton}>🔍</button>
                <button className={styles.cartButton}>🛒</button>
            </div>
            <nav className={`${styles.headerNav} ${isOpen ? styles.open : ''}`}>
                <Link className={styles.headerLink} href="/" onClick={toggleMenu}>Головна</Link>
                <Link className={styles.headerLink} href="/login" onClick={toggleMenu}>Увійти</Link>
                <Link className={styles.headerLink} href="/register" onClick={toggleMenu}>Реєстрація</Link>
            </nav>
        </header>
    );
};

export default Header;
