// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getUserProfile } from '../../services/auth';
// import useModal from '../../hooks/useModal';
// import Loading from '../Loading/Loading';
// import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
// import ConfirmEmailModal from '../User/ConfirmEmailModal';
// import AddPhoneNumber from '../User/AddPhoneNumber';
// import ConfirmPhoneModal from '../User/ConfirmPhoneModal';

// const Profile = ({ }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [user, setUser] = useState(null);

//     const { isModalOpen: isEmailModalOpen, openModal: openEmailModal, closeModal: closeEmailModal } = useModal()
//     const { isModalOpen: isAddPhoneModalOpen, openModal: openAddPhoneModal, closeModal: closeAddPhoneModal } = useModal();
//     const { isModalOpen: isConfirmPhoneModalOpen, openModal: openConfirmPhoneModal, closeModal: closeConfirmPhoneModal } = useModal();

//     const router = useRouter();

//     useEffect(() => {
//         const checkUserStatus = async () => {
//             try {
//                 const userProfile = await getUserProfile();

//                 if (!userProfile.isAuthenticated) {
//                     router.push('/login');
//                     return;
//                 }

//                 if (!userProfile.emailconfirmed) {
//                     openEmailModal();
//                 } else if (!userProfile.phone) {
//                     openAddPhoneModal();
//                 } else if (!userProfile.phoneconfirmed) {
//                     openConfirmPhoneModal();
//                 } else {
//                     setUser(userProfile);
//                 }

//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         checkUserStatus();
//     }, [router]);

//     if (loading) return <Loading />;
//     if (error) return <ErrorDisplay error={error} />;

//     return (
//         <div>
//             <h1>Профіль користувача</h1>
//             {user && (
//                 <div>
//                     <p>Ім'я: {user.name}</p>
//                     <p>Email: {user.email}</p>
//                     <p>Телефон: {user.phone}</p>
//                 </div>
//             )}
//             <ConfirmEmailModal show={isEmailModalOpen} onClose={openEmailModal()} email={user?.email} />
//             <AddPhoneNumber show={isAddPhoneModalOpen} onClose={openAddPhoneModal()} onPhoneConfirmed={openConfirmPhoneModal()} />
//             <ConfirmPhoneModal show={isConfirmPhoneModalOpen} onClose={openConfirmPhoneModal()} phone={user?.phone} />
//         </div>
//     );
// };

// export default Profile;
