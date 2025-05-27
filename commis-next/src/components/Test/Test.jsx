import React, { useEffect } from 'react';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';

const Test = () => {
    const { isModalOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        setTimeout(() => {
            openModal();
        }, 3000);
    }, []);

    return (
        <div>
            <Modal show={isModalOpen} onClose={closeModal}>
                <div>
                    Так то працює!
                </div>
            </Modal>
        </div>
    );
};

export default Test;




// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import checkUserStatus from "@/utils/checkUserStatus";
// import ConfirmEmailModal from "../User/ConfirmEmailModal";
// import AddPhoneNumber from "../User/AddPhoneNumber";
// import ConfirmPhoneModal from "../User/ConfirmPhoneModal";
// import styles from '../Product/styles/ProductCard.module.css';

// const BuyButton = ({ product, selectedSize }) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [showEmailModal, setShowEmailModal] = useState(false);
//     const [showAddPhoneModal, setShowAddPhoneModal] = useState(false);
//     const [showConfirmPhoneModal, setShowConfirmPhoneModal] = useState(false);
//     const [readyToBuy, setReadyToBuy] = useState(false);

//     const { addToCart } = useCart();
//     const { user, handleLogin } = useAuth();
//     const router = useRouter();

//     const handleBuy = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             if (!selectedSize) {
//                 alert('Будь ласка, виберіть розмір перед додаванням в кошик.');
//                 return;
//             }

//             await checkUserStatus({
//                 setUser: handleLogin,
//                 setError,
//                 setLoading,
//                 openEmailModal: () => setShowEmailModal(true),
//                 openAddPhoneModal: () => setShowAddPhoneModal(true),
//                 openConfirmPhoneModal: () => setShowConfirmPhoneModal(true),
//             });

//             setReadyToBuy(true);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const proceedToCart = () => {
//         addToCart(product, selectedSize);
//         router.push('/cart');
//     };

//     return (
//         <>
//             <button className={styles.productCardButton} onClick={handleBuy} disabled={loading}>
//                 {loading ? 'Завантаження...' : 'Купити'}
//             </button>
//             {error && <p className={styles.errorMessage}>{error}</p>}

//             {showEmailModal && <ConfirmEmailModal show onClose={() => setShowEmailModal(false)} email={user?.email} />}
//             {showAddPhoneModal && <AddPhoneNumber show onClose={() => setShowAddPhoneModal(false)} onPhoneAdded={() => {
//                 setShowAddPhoneModal(false);
//                 setShowConfirmPhoneModal(true);
//             }} />}
//             {showConfirmPhoneModal && <ConfirmPhoneModal show onClose={() => {
//                 setShowConfirmPhoneModal(false);
//                 if (readyToBuy) proceedToCart();
//             }} />}
//         </>
//     );
// };

// export default BuyButton;





// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import checkUserStatus from "@/utils/checkUserStatus";
// import ConfirmEmailModal from "../User/ConfirmEmailModal";
// import AddPhoneNumber from "../User/AddPhoneNumber";
// import ConfirmPhoneModal from "../User/ConfirmPhoneModal";
// import styles from '../Product/styles/ProductCard.module.css';

// const BuyButton = ({ product, selectedSize }) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [showEmailModal, setShowEmailModal] = useState(false);
//     const [showAddPhoneModal, setShowAddPhoneModal] = useState(false);
//     const [showConfirmPhoneModal, setShowConfirmPhoneModal] = useState(false);
//     const [readyToBuy, setReadyToBuy] = useState(false);

//     const { addToCart } = useCart();
//     const { user, handleLogin } = useAuth();
//     const router = useRouter();

//     const handleBuy = async () => {
//         setLoading(true);
//         setError(null);
//         setReadyToBuy(false);

//         try {
//             if (!selectedSize) {
//                 alert('Будь ласка, виберіть розмір перед додаванням в кошик.');
//                 return;
//             }

//             let modalsShown = false;

//             await checkUserStatus({
//                 setUser: handleLogin,
//                 setError,
//                 setLoading,
//                 openEmailModal: () => {
//                     modalsShown = true;
//                     setShowEmailModal(true);
//                 },
//                 openAddPhoneModal: () => {
//                     modalsShown = true;
//                     setShowAddPhoneModal(true);
//                 },
//                 openConfirmPhoneModal: () => {
//                     modalsShown = true;
//                     setShowConfirmPhoneModal(true);
//                 },
//             });

//             if (!modalsShown) {
//                 proceedToCart();
//             } else {
//                 setReadyToBuy(true);
//             }
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const proceedToCart = () => {
//         addToCart(product, selectedSize);
//         router.push('/cart');
//     };

//     return (
//         <>
//             <button className={styles.productCardButton} onClick={handleBuy} disabled={loading}>
//                 {loading ? 'Завантаження...' : 'Купити'}
//             </button>
//             {error && <p className={styles.errorMessage}>{error}</p>}

//             {showEmailModal && <ConfirmEmailModal show onClose={() => setShowEmailModal(false)} email={user?.email} />}
//             {showAddPhoneModal && <AddPhoneNumber show onClose={() => setShowAddPhoneModal(false)} onPhoneAdded={() => {
//                 setShowAddPhoneModal(false);
//                 setShowConfirmPhoneModal(true);
//             }} />}
//             {showConfirmPhoneModal && <ConfirmPhoneModal show onClose={() => {
//                 setShowConfirmPhoneModal(false);
//                 setReadyToBuy(false);
//             }} onPhoneConfirmed={() => {
//                 setShowConfirmPhoneModal(false);
//                 if (readyToBuy) proceedToCart();
//             }} />}
//         </>
//     );
// };

// export default BuyButton;