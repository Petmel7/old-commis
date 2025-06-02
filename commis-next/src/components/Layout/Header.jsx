
import React from 'react';
import SearchMenu from './SearchMenu';
import NavIcons from './NavIcons';
import useToggle from '@/hooks/useToggle';
import AuthIcon from './AuthIcon';
import Logo from './Logo/Logo';
import Tooltip from '../Tooltip/Tooltip';
import styles from './styles/Header.module.css';
import SearchIcon from '../../../public/img/Search.svg';

const Header = () => {
    const { isOpen, handleOpenClick, handleCloseClick } = useToggle();

    return (
        <>
            <header className={styles.header}>
                <div className={`${styles.headerContainer} container`}>
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