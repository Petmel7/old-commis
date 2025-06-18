
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

    const {
        isModalOpen: isAddLastNameModalOpen,
        openModal: openAddLastNameModal,
        closeModal: closeAddLastNameModal
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
            openAddLastNameModal,
            openConfirmPhoneModal
        });
    }, [user]);

    return {
        loading,
        error,
        user,
        loadingErrorComponent,
        isEmailModalOpen,
        isAddLastNameModalOpen,
        isAddPhoneModalOpen,
        isConfirmPhoneModalOpen,
        openEmailModal,
        closeEmailModal,
        openAddPhoneModal,
        openAddLastNameModal,
        closeAddPhoneModal,
        openConfirmPhoneModal,
        closeAddLastNameModal,
        closeConfirmPhoneModal,
    };
};

export default useUserStatus;