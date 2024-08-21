
import Link from 'next/link';
import React from 'react';
import ConfirmEmailModal from './ConfirmEmailModal';
import AddPhoneNumber from './AddPhoneNumber';
import ConfirmPhoneModal from './ConfirmPhoneModal';
import useUserStatus from '../../hooks/useUserStatus';
import styles from './styles/Profile.module.css';

const Profile = () => {
    const {
        user,
        loadingErrorComponent,
        isEmailModalOpen,
        closeEmailModal,
        isAddPhoneModalOpen,
        closeAddPhoneModal,
        openConfirmPhoneModal,
        isConfirmPhoneModalOpen,
        closeConfirmPhoneModal,
    } = useUserStatus();

    console.log('Profile->user', user);

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div>
            {user && (
                <div className={styles.profileContainer}>
                    <div className={styles.profileDetails}>
                        <p>Привіт! {user.name}</p>
                    </div>
                    <ul className={styles.profileLinks}>
                        <li>
                            <Link href='/productAdd'>Додати продукт</Link>
                        </li>
                        <li>
                            <Link href='/userProducts'>Мої продукти</Link>
                        </li>
                        <li>
                            <Link href='/orderList'>Замовлення</Link>
                        </li>
                    </ul>
                </div>
            )}
            {isEmailModalOpen && <ConfirmEmailModal show={isEmailModalOpen} onClose={closeEmailModal} email={user?.email} />}
            {isAddPhoneModalOpen && <AddPhoneNumber show={isAddPhoneModalOpen} onClose={closeAddPhoneModal} onPhoneAdded={openConfirmPhoneModal} />}
            {isConfirmPhoneModalOpen && <ConfirmPhoneModal show={isConfirmPhoneModalOpen} onClose={closeConfirmPhoneModal} />}
        </div>
    );
};

export default Profile;


