import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { createOrder } from '../../services/order';
import useUserStatus from '../../hooks/useUserStatus';
import ConfirmEmailModal from '../User/ConfirmEmailModal';
import AddPhoneNumber from '../User/AddPhoneNumber';
import ConfirmPhoneModal from '../User/ConfirmPhoneModal';
// import useLoadingAndError from '../../hooks/useLoadingAndError';

const OrderDetails = () => {
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const { cart, clearCart } = useCart();

    const {
        loading,
        error,
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

    // const loadingErrorComponent = useLoadingAndError(loading, error);

    const handleOrder = async (e) => {
        e.preventDefault();
        // setLoading(true);
        // setError(null);

        const items = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        console.log('Cart->items', items);

        try {
            const response = await createOrder({ items });
            console.log('Cart->response', response);
            console.log('handleOrder->response.message', response.message);

            // setLoading(false);
            clearCart();
        } catch (error) {
            // setError(error.message);
            // setLoading(false);
            console.log('OrderDetails->error', error);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div>
            {user && (
                <>
                    <h3>Order Details</h3>
                    <button onClick={handleOrder}>Підтвердити замовлення</button>
                </>
            )}
            {isEmailModalOpen && <ConfirmEmailModal show={isEmailModalOpen} onClose={closeEmailModal} email={user?.email} />}
            {isAddPhoneModalOpen && <AddPhoneNumber show={isAddPhoneModalOpen} onClose={closeAddPhoneModal} onPhoneAdded={openConfirmPhoneModal} />}
            {isConfirmPhoneModalOpen && <ConfirmPhoneModal show={isConfirmPhoneModalOpen} onClose={closeConfirmPhoneModal} phone={user?.phone} />}
        </div>
    )
}

export default OrderDetails;