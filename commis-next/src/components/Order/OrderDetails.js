
// import { useCart } from '@/context/CartContext';
// import { createOrder } from '../../services/order';
// import useUserStatus from '../../hooks/useUserStatus';
// import ConfirmEmailModal from '../User/ConfirmEmailModal';
// import AddPhoneNumber from '../User/AddPhoneNumber';
// import ConfirmPhoneModal from '../User/ConfirmPhoneModal';

// const OrderDetails = () => {
//     const { cart, clearCart } = useCart();

//     const {
//         loading,
//         error,
//         user,
//         loadingErrorComponent,
//         isEmailModalOpen,
//         closeEmailModal,
//         isAddPhoneModalOpen,
//         closeAddPhoneModal,
//         openConfirmPhoneModal,
//         isConfirmPhoneModalOpen,
//         closeConfirmPhoneModal,
//     } = useUserStatus();

//     const handleOrder = async (e) => {
//         e.preventDefault();

//         const items = cart.map(item => ({
//             product_id: item.id,
//             quantity: item.quantity
//         }));

//         console.log('Cart->items', items);

//         try {
//             const response = await createOrder({ items });
//             console.log('Cart->response', response);
//             console.log('handleOrder->response.message', response.message);

//             clearCart();
//         } catch (error) {
//             console.log('OrderDetails->error', error);
//         }
//     };

//     if (loadingErrorComponent) return loadingErrorComponent;

//     return (
//         <div>
//             {user && (
//                 <>
//                     <h3>Order Details</h3>
//                     <button onClick={handleOrder}>Підтвердити замовлення</button>
//                 </>
//             )}
//             {isEmailModalOpen && <ConfirmEmailModal show={isEmailModalOpen} onClose={closeEmailModal} email={user?.email} />}
//             {isAddPhoneModalOpen && <AddPhoneNumber show={isAddPhoneModalOpen} onClose={closeAddPhoneModal} onPhoneAdded={openConfirmPhoneModal} />}
//             {isConfirmPhoneModalOpen && <ConfirmPhoneModal show={isConfirmPhoneModalOpen} onClose={closeConfirmPhoneModal} phone={user?.phone} />}
//         </div>
//     )
// }

// export default OrderDetails;