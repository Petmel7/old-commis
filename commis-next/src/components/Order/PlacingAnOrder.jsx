
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { createOrder } from '../../services/order';
import { createPayment } from '@/services/payment';
import { baseUrl } from '../Url/baseUrl';
import { useRouter } from 'next/router';
import useUserStatus from '../../hooks/useUserStatus';
import ConfirmEmailModal from '../User/ConfirmEmailModal';
import AddPhoneNumber from '../User/AddPhoneNumber';
import ConfirmPhoneModal from '../User/ConfirmPhoneModal';
import useLoadingAndError from '@/hooks/useLoadingAndError';
import DeleteOrder from './DeleteOrderCart';
import AddressForm from './AddressForm';
import EmptyCart from './EmptyСart';
import styles from './styles/Cart.module.css';

const PlacingAnOrder = () => {
    const { cart, increaseQuantity, decreaseQuantity } = useCart();
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const router = useRouter();

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const {
        user,
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

        if (!address) {
            alert('Будь ласка, виберіть адресу для доставки');
            return;
        }

        setLoading(true);

        const items = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            size: item.size
        }));

        const orderDetails = {
            items,
            address: [address],
        };

        try {
            const response = await createOrder(orderDetails);
            const orderId = response?.orderId;

            if (!orderId) {
                throw new Error('Не вдалося створити замовлення: orderId не знайдено');
            }

            if (paymentMethod === 'paypal') {
                // Викликаємо createPayment для PayPal
                const dataPayment = {
                    amount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
                    currency: 'USD',
                    orderId,
                    userId: user.id,
                };
                const paymentResponse = await createPayment(dataPayment);
                const approvalUrl = paymentResponse.links.find(link => link.rel === 'approve')?.href;

                if (approvalUrl) {
                    window.location.href = approvalUrl; // Перенаправлення на PayPal
                } else {
                    throw new Error('Не вдалося отримати URL для підтвердження оплати.');
                }
            } else if (paymentMethod === 'cod') {
                router.push('/thanksForTheOrder');
            } else {
                alert('Будь ласка, виберіть метод оплати');
            }

            setLoading(false);
        } catch (error) {
            setError(error);
            console.error('OrderDetails->error', error.message || error);
            alert('Щось пішло не так. Спробуйте ще раз.');
        }
    };

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div className={styles.container}>
            {user && cart.length !== 0 ? (
                <div>
                    <h3 className={styles.cartTitle}>Оформлення замовлення</h3>
                    {cart.map(item => (
                        <div className={styles.cartContainer} key={item.id}>
                            <div className={styles.cartItem}>
                                <div>
                                    <img className={styles.cartImage} src={`${baseUrl}${item.images[0]}`} alt={item.name} />
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
                            <div className={styles.cartPriceContainer}>
                                <p className={styles.itemName}>{item.name}</p>
                                <p className={styles.itemName}>Розмір: ({item.size})</p>
                                <span className={styles.cartPrice}>Ціна за одиницю: {item.price}</span>
                                <span className={styles.totalPrice}>Загальна ціна: {calculateTotalPrice(item)}</span>
                            </div>
                        </div>
                    ))}

                    <h3 className={styles.cartTitle}>Оплата</h3>
                    <div>
                        <div>
                            <input
                                type='radio'
                                name="paymentMethod"
                                value="paypal"
                                checked={paymentMethod === 'paypal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label>Оплатити через PayPal</label>
                        </div>

                        <div>
                            <input
                                type='radio'
                                name="paymentMethod"
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label>Оплата при отриманні</label>
                        </div>
                    </div>

                    <h3 className={styles.cartTitle}>Доставка</h3>
                    <AddressForm onAddressSelected={setAddress} />
                    <div className={styles.cartButtonContainer}>
                        <button className={styles.cartButton} onClick={handleOrder}>Підтвердити замовлення</button>
                    </div>
                </div>
            ) : (
                <EmptyCart />
            )}
            {isEmailModalOpen && <ConfirmEmailModal show={isEmailModalOpen} onClose={closeEmailModal} email={user?.email} />}
            {isAddPhoneModalOpen && <AddPhoneNumber show={isAddPhoneModalOpen} onClose={closeAddPhoneModal} onPhoneAdded={openConfirmPhoneModal} />}
            {isConfirmPhoneModalOpen && <ConfirmPhoneModal show={isConfirmPhoneModalOpen} onClose={closeConfirmPhoneModal} />}
        </div>
    );
};

export default PlacingAnOrder;


