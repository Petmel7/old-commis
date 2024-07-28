import { useEffect, useState } from 'react';
import { getUserProfile } from '../services/auth';
import useModal from './useModal';
import useLoadingAndError from './useLoadingAndError';

const useUserStatus = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const { isModalOpen: isEmailModalOpen, openModal: openEmailModal, closeModal: closeEmailModal } = useModal();
    const { isModalOpen: isAddPhoneModalOpen, openModal: openAddPhoneModal, closeModal: closeAddPhoneModal } = useModal();
    const { isModalOpen: isConfirmPhoneModalOpen, openModal: openConfirmPhoneModal, closeModal: closeConfirmPhoneModal } = useModal();

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const userProfile = await getUserProfile();

                if (!userProfile.emailconfirmed) {
                    openEmailModal();
                } else if (!userProfile.phone) {
                    openAddPhoneModal();
                } else if (!userProfile.phoneconfirmed) {
                    openConfirmPhoneModal();
                } else {
                    setUser(userProfile);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        checkUserStatus();
    }, []);

    return {
        loading,
        error,
        user,
        loadingErrorComponent,
        isEmailModalOpen,
        openEmailModal,
        closeEmailModal,
        isAddPhoneModalOpen,
        openAddPhoneModal,
        closeAddPhoneModal,
        isConfirmPhoneModalOpen,
        openConfirmPhoneModal,
        closeConfirmPhoneModal,
    };
};

export default useUserStatus;
