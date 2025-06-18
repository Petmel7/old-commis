
// const checkUserStatus = async ({
//     user,
//     setUser,
//     setError,
//     setLoading,
//     openEmailModal,
//     openAddPhoneModal,
//     openConfirmPhoneModal
// }) => {
//     try {
//         if (!user) {
//             setLoading(false);
//             return;
//         }
//         if (!user.email_confirmed) {
//             openEmailModal();
//         } else if (!user.phone) {
//             openAddPhoneModal();
//         } else if (!user.phone_confirmed) {
//             openConfirmPhoneModal();
//         } else {
//             setUser(user);
//         }

//         setLoading(false);
//     } catch (err) {
//         setError(err.message);
//         setLoading(false);
//     }
// };

// export default checkUserStatus;



const checkUserStatus = async ({
    user,
    setUser,
    setError,
    setLoading,
    openEmailModal,
    openAddPhoneModal,
    openAddLastNameModal,
    openConfirmPhoneModal
}) => {
    try {
        if (!user) {
            setLoading(false);
            return;
        }
        if (!user.email_confirmed) {
            openEmailModal();
        } else if (!user.phone) {
            openAddPhoneModal();
        } else if (!user.phone_confirmed) {
            openConfirmPhoneModal();
        } else {
            setUser(user);
        }

        setLoading(false);
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }
};

export default checkUserStatus;