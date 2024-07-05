
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import styles from './styles/Header.module.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={styles.header}>
            <button className={styles.burgerButton} onClick={toggleMenu}>
                ☰
            </button>
            <div className={styles.searchContainer}>
                <input type="text" className={styles.searchInput} placeholder="Пошук..." />
                <button className={styles.searchButton}>🔍</button>
                <button className={styles.cartButton}>🛒</button>
            </div>
            <nav className={`${styles.headerNav} ${isOpen ? styles.open : ''}`}>
                <Link className={styles.headerLink} to="/" onClick={toggleMenu}>Головна</Link>
                <Link className={styles.headerLink} to="/login" onClick={toggleMenu}>Логін</Link>
                <Link className={styles.headerLink} to="/register" onClick={toggleMenu}>Реєстрація</Link>
            </nav>
        </header>
    );
};

export default Header;


