
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import SearchMenu from './SearchMenu';
import NavIcons from './NavIcons';
import useToggle from '@/hooks/useToggle';
import Logo from './Logo/Logo';
import Tooltip from '../Tooltip/Tooltip';
import styles from './styles/Header.module.css';
import SearchIcon from '../../../public/img/Search.svg';
import ProfileIcon from '../../../public/img/Profile.svg';
import DefaultIcon from '../../../public/jpg/default.jpg';

const AuthIcon = () => {
    const { isAuthenticated } = useAuth();
    const profileLink = isAuthenticated ? '/profile' : '/login';

    return (
        <Link href={profileLink}>
            <Tooltip text="Профіль" position="bottom">
                {!isAuthenticated ? (
                    <ProfileIcon className={styles.headerIcon} />
                ) : (
                    <Image className={styles.defaultIcon} src={DefaultIcon} alt="Default Icon" width={40} height={40} />
                )}
            </Tooltip>
        </Link>
    );
};

const Header = () => {
    const { isOpen, handleOpenClick, handleCloseClick } = useToggle();

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Logo />
                    <div className={styles.iconContainer}>
                        <Tooltip text="Пошук" position="bottom">
                            <button className={styles.searchButton} onClick={handleOpenClick}>
                                <SearchIcon className={styles.headerIcon} />
                            </button>
                        </Tooltip>
                        <div className="desktop-only">
                            <NavIcons />
                        </div>
                        <AuthIcon />
                    </div>
                </div>
            </header>

            <SearchMenu isOpen={isOpen} handleCloseClick={handleCloseClick} />
        </>
    );
};

export default Header;
