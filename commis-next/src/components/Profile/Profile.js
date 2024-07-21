// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getUserProfile } from '../../services/auth'; // Ваш сервіс для отримання профілю користувача
// import Loading from '../Loading/Loading';
// import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
// import ConfirmEmailModal from '../User/ConfirmEmailModal';
// import AddPhoneNumber from '../User/AddPhoneNumber';
// import ConfirmPhoneModal from '../User/ConfirmPhoneModal';

// const Profile = () => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [user, setUser] = useState(null);
//     const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
//     const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
//     const [isConfirmPhoneModalOpen, setIsConfirmPhoneModalOpen] = useState(false);

//     const router = useRouter();

//     useEffect(() => {
//         const checkUserStatus = async () => {
//             try {
//                 const userProfile = await getUserProfile();

//                 console.log('Profile->userProfile', userProfile);

//                 // if (!userProfile.isAuthenticated) {
//                 //     router.push('/login');
//                 //     return;
//                 // }

//                 if (!userProfile.emailConfirmed) {
//                     setIsEmailModalOpen(true);
//                 } else if (!userProfile.phone) {
//                     setIsPhoneModalOpen(true);
//                 } else if (!userProfile.phoneConfirmed) {
//                     setIsConfirmPhoneModalOpen(true);
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
//             <ConfirmEmailModal show={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} email={user?.email} />
//             <AddPhoneNumber show={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)} onPhoneConfirmed={() => setIsConfirmPhoneModalOpen(true)} />
//             <ConfirmPhoneModal show={isConfirmPhoneModalOpen} onClose={() => setIsConfirmPhoneModalOpen(false)} phone={user?.phone} />
//         </div>
//     );
// };

// export default Profile;
