
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getProfileLinks } from './constants/profileLinks';
import useCheckUserBlocked from '@/hooks/useCheckUserBlocked';
import ConfirmEmailModal from './ConfirmEmailModal';
import AddPhoneNumber from './AddPhoneNumber';
import ConfirmPhoneModal from './ConfirmPhoneModal';
import AddLastName from './AddLastName';
import useUserStatus from '../../hooks/useUserStatus';
import Tooltip from '../Tooltip/Tooltip';
import UserStatusText from '../UserStatusText/UserStatusText';
import styles from './styles/Profile.module.css';

const Profile = () => {
    useCheckUserBlocked();
    const { user, isBlocked } = useAuth();

    const {
        loadingErrorComponent,
        isEmailModalOpen,
        closeEmailModal,
        isAddPhoneModalOpen,
        isAddLastNameModalOpen,
        openAddLastNameModal,
        closeAddLastNameModal,
        closeAddPhoneModal,
        openConfirmPhoneModal,
        isConfirmPhoneModalOpen,
        closeConfirmPhoneModal,
    } = useUserStatus();

    useEffect(() => {
        if (user?.role === 'seller' && !user?.last_name) {
            openAddLastNameModal();
        }
    }, [user]);

    if (isBlocked) return <UserStatusText />;

    if (loadingErrorComponent) return loadingErrorComponent;

    const links = getProfileLinks(user.id, user.role);

    return (
        <div>
            {user && (
                <div className={styles.profileContainer}>
                    <div className={styles.profileDetails}>
                        <p>Привіт! {user.name}</p>
                    </div>
                    <ul className={styles.profileLinks}>
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>
                                    <Tooltip text={link.tooltip} position="bottom">
                                        {link.text}
                                    </Tooltip>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {isEmailModalOpen &&
                <ConfirmEmailModal
                    show={isEmailModalOpen}
                    onClose={closeEmailModal}
                    email={user?.email}
                />}
            {isAddPhoneModalOpen &&
                <AddPhoneNumber
                    show={isAddPhoneModalOpen}
                    onClose={closeAddPhoneModal}
                    onPhoneAdded={openConfirmPhoneModal}
                />}
            {isConfirmPhoneModalOpen &&
                <ConfirmPhoneModal
                    show={isConfirmPhoneModalOpen}
                    onClose={closeConfirmPhoneModal}
                />}
            {isAddLastNameModalOpen &&
                <AddLastName
                    show={isAddLastNameModalOpen}
                    onClose={closeAddLastNameModal}
                />}
        </div>
    );
};

export default Profile;