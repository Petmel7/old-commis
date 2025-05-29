
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import useModal from './useModal';
import useLoadingAndError from './useLoadingAndError';
import checkUserStatus from '../utils/checkUserStatus';

const useUserStatus = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, setUser } = useAuth();

    const {
        isModalOpen: isEmailModalOpen,
        openModal: openEmailModal,
        closeModal: closeEmailModal
    } = useModal();

    const {
        isModalOpen: isAddPhoneModalOpen,
        openModal: openAddPhoneModal,
        closeModal: closeAddPhoneModal
    } = useModal();

    const {
        isModalOpen: isConfirmPhoneModalOpen,
        openModal: openConfirmPhoneModal,
        closeModal: closeConfirmPhoneModal
    } = useModal();

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        if (user === null) return;
        checkUserStatus({
            user,
            setUser,
            setError,
            setLoading,
            openEmailModal,
            openAddPhoneModal,
            openConfirmPhoneModal
        });
    }, [user]);

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
