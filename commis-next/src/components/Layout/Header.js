
import React, { useState } from 'react';
import styles from './styles/Header.module.css';
import SearchIcon from '../../../public/img/Search.svg';
import ProfileIcon from '../../../public/img/Profile.svg';
import CloseIcon from '../../../public/img/close.svg';
import Logout from '../User/Logout';
import Link from 'next/link';

const Header = ({ isAuthenticated, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearchClick = () => {
        setIsMenuOpen(true);
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
                        {isAuthenticated ? (
                            <Logout onLogout={onLogout} />
                        ) : (
                            <button className={styles.searchButton}>
                                <Link href='/login'>
                                    <ProfileIcon className={styles.headerProfileIcon} />
                                </Link>
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <div className={`${styles.searchMenu} ${isMenuOpen ? styles.searchMenuOpen : ''}`}>
                <button className={styles.closeButton} onClick={handleCloseClick}>
                    <CloseIcon />
                </button>
                <input className={styles.searchInput} type="text" placeholder="Пошук..." />
            </div>
        </>
    );
};

export default Header;
