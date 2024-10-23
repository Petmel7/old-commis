import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import Logout from '../User/Logout';
import Tooltip from '../Tooltip/Tooltip';
import styles from './styles/Header.module.css';
import ProfileIcon from '../../../public/img/Profile.svg';
import DefaultIcon from '../../../public/jpg/default.jpg';

const AuthIcon = () => {
    const { isAuthenticated } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const profileLink = isAuthenticated ? '/profile' : '/login';

    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const handleCloseDropdown = () => setShowDropdown(false);

    return (
        <div className={styles.authIconContainer}>
            <Tooltip text="Профіль" position="bottom">
                {!isAuthenticated ? (
                    <Link href={profileLink}>
                        <ProfileIcon className={styles.headerIcon} />
                    </Link>
                ) : (
                    <Image className={styles.defaultIcon} src={DefaultIcon} onClick={toggleDropdown} alt="Default Icon" width={40} height={40} />
                )}
            </Tooltip>

            {showDropdown && (
                <ul className={styles.dropdownMenu} >
                    <li>
                        <Link href="/profile" onClick={() => setShowDropdown(false)}>
                            Профіль
                        </Link>
                    </li>
                    <li >
                        <Logout onLogout={handleCloseDropdown} />
                    </li>
                </ul>
            )}
        </div>
    );
};

export default AuthIcon;