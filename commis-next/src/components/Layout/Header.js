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


// import Link from 'next/link';
// import React, { useState } from 'react';
// import styles from './styles/Header.module.css';
// import SearchIcon from '../../../public/img/Search.svg';
// import ProfileIcon from '../../../public/img/Profile.svg';
// import CloseIcon from '../../../public/img/close.svg';

// const AuthIcon = ({ isAuthenticated }) => {
//     // const profileLink = isAuthenticated ? '/profile' : '/login';
//     const profileIconClass = isAuthenticated ? styles.authenticated : '';

//     return (
//         <Link href='/profile'>
//             <ProfileIcon
//                 className={`${styles.profileIcon}
//                 ${profileIconClass}`}
//             />
//         </Link>
//     )
// };

// const Header = ({ isAuthenticated }) => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const handleSearchClick = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     const handleCloseClick = () => {
//         setIsMenuOpen(false);
//     };

//     return (
//         <>
//             <header className={styles.header}>
//                 <div className={styles.headerContainer}>
//                     <h1 className={styles.headerLogo}>Commis</h1>
//                     <div className={styles.iconContainer}>
//                         <button className={styles.searchButton} onClick={handleSearchClick}>
//                             <SearchIcon className={styles.headerSearchIcon} />
//                         </button>
//                         <AuthIcon isAuthenticated={isAuthenticated} />
//                     </div>
//                 </div>
//             </header>
//             <div className={`${styles.searchMenu} ${isMenuOpen ? styles.searchMenuOpen : ''}`}>
//                 <button className={styles.closeButton} onClick={handleCloseClick}>
//                     <CloseIcon />
//                 </button>
//                 <input type="text" className={styles.searchInput} placeholder="Пошук..." />
//             </div>
//         </>
//     );
// };

// export default Header;


