import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { createOrder } from '../../services/order';
import { baseUrl } from '../Url/baseUrl';
import useUserStatus from '../../hooks/useUserStatus';
import ConfirmEmailModal from '../User/ConfirmEmailModal';
import AddPhoneNumber from '../User/AddPhoneNumber';
import ConfirmPhoneModal from '../User/ConfirmPhoneModal';
import DeleteOrder from './DeleteOrder';
import AddressForm from './AddressForm';
import styles from './styles/Cart.module.css';

const PlacingAnOrder = () => {
    const { cart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
    const [address, setAddress] = useState(null);

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

    const handleOrder = async (e) => {
        e.preventDefault();

        const items = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        if (!address) {
            alert('Будь ласка, виберіть адресу для доставки');
            return;
        }

        const orderDetails = {
            items,
            address: [address],
        };

        console.log('OrderDetails->orderDetails', orderDetails);

        try {
            const response = await createOrder(orderDetails);
            console.log('OrderDetails->response', response);
            console.log('handleOrder->response.message', response.message);

            clearCart();
        } catch (error) {
            console.log('OrderDetails->error', error);
        }
    };

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div>
            {user && (
                <div>
                    <h3 className={styles.cartTitle}>Оформлення замовлення</h3>
                    {cart.map(item => (
                        <div className={styles.cartContainer} key={item.id}>
                            <div className={styles.cartItem}>
                                <div>
                                    <img className={styles.cartImage} src={`${baseUrl}${item.image}`} alt={item.name} />
                                </div>

                                <div className={styles.quantityContainer}>
                                    <div className={styles.quantityButtonContainer}>
                                        <button className={styles.quantityButton} onClick={() => decreaseQuantity(item.id)}>-</button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button className={styles.quantityButton} onClick={() => increaseQuantity(item.id)}>+</button>
                                    </div>

                                    <DeleteOrder productId={item.id} />
                                </div>
                            </div>
                            <div className={styles.cartPriceConteaner}>
                                <p className={styles.itemName}>{item.name}</p>
                                <span className={styles.cartPrice}>Ціна за одиницю: {item.price}</span>
                                <span className={styles.totalPrice}>Загальна ціна: {calculateTotalPrice(item)}</span>
                            </div>
                        </div>
                    ))}
                    <h3 className={styles.cartTitle}>Доставка</h3>
                    <AddressForm onAddressSelected={setAddress} />
                    <button className={styles.cartButton} onClick={handleOrder}>Підтвердити замовлення</button>
                </div>
            )}
            {isEmailModalOpen && <ConfirmEmailModal show={isEmailModalOpen} onClose={closeEmailModal} email={user?.email} />}
            {isAddPhoneModalOpen && <AddPhoneNumber show={isAddPhoneModalOpen} onClose={closeAddPhoneModal} onPhoneAdded={openConfirmPhoneModal} />}
            {isConfirmPhoneModalOpen && <ConfirmPhoneModal show={isConfirmPhoneModalOpen} onClose={closeConfirmPhoneModal} phone={user?.phone} />}
        </div>
    )
}

export default PlacingAnOrder;



