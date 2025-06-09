
import Link from 'next/link';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import useCheckUserBlocked from '@/hooks/useCheckUserBlocked';
import ConfirmEmailModal from './ConfirmEmailModal';
import AddPhoneNumber from './AddPhoneNumber';
import ConfirmPhoneModal from './ConfirmPhoneModal';
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
        closeAddPhoneModal,
        openConfirmPhoneModal,
        isConfirmPhoneModalOpen,
        closeConfirmPhoneModal,
    } = useUserStatus();

    if (isBlocked) return <UserStatusText />;

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
                            <Link href='/productAdd'>
                                <Tooltip text="Тут ви можете додати продукт" position="bottom">
                                    Додати продукт
                                </Tooltip>
                            </Link>
                        </li>
                        <li>
                            <Link href='/userProducts'>
                                <Tooltip text="Тут знаходяться всі додані ваші продукти" position="bottom">
                                    Мої продукти
                                </Tooltip>
                            </Link>
                        </li>
                        <li>
                            <Link href='/orderList'>
                                <Tooltip text="Тут знаходяться замовлення ваших продуктів" position="bottom">
                                    Замовлення
                                </Tooltip>
                            </Link>
                        </li>
                        {user.role === 'superadmin' && (
                            <li>
                                <Link href='/adminOffice'>
                                    <Tooltip text="Кабінет адміністратора" position="bottom">
                                        Кабінет адміністратора
                                    </Tooltip>
                                </Link>
                            </li>
                        )}
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