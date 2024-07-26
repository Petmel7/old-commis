
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './styles/Header.module.css';
import SearchIcon from '../../../public/img/Search.svg';
import ProfileIcon from '../../../public/img/Profile.svg';
import DefaultIcon from '../../../public/jpg/default.jpg';
import CloseIcon from '../../../public/img/close.svg';

const AuthIcon = () => {
    const { isAuthenticated } = useAuth()
    const profileLink = isAuthenticated ? '/profile' : '/login';

    return (
        <Link href={profileLink}>
            {!isAuthenticated ? (
                <ProfileIcon className={styles.profileIcon} />
            ) : (
                <Image className={styles.defaultIcon} src={DefaultIcon} alt="Default Icon" width={40} height={40} />
            )}
        </Link>
    );
};

const Header = () => {
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
                        <AuthIcon />
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
