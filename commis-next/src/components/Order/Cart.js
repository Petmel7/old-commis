
import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/order';
import DeleteOrder from './DeleteOrder';
import styles from './styles/Cart.module.css';
import { baseUrl } from '../Url/baseUrl';

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity } = useCart();
    console.log('Cart->cart', cart);

    const handleOrder = async () => {
        const items = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        console.log('Cart->items', items);

        try {
            const response = await createOrder({ items });
            console.log('Cart->response', response);
            console.log('handleOrder->response.message', response.message);
        } catch (error) {
            console.error('handleOrder->error', error);
        }
    };

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    const calculateGrandTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Корзина</h1>
            {cart.map(item => (
                <div className={styles.cartContainer}>
                    <div className={styles.cartItem} key={item.id}>
                        <div>
                            <img className={styles.cartImage} src={`${baseUrl}${item.image}`} alt={item.name} />
                        </div>

                        <div className={styles.quantityButtonContainer}>
                            <button className={styles.quantityButton} onClick={() => decreaseQuantity(item.id)}>-</button>
                            <span className={styles.quantity}>{item.quantity}</span>
                            <button className={styles.quantityButton} onClick={() => increaseQuantity(item.id)}>+</button>

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
            <div >
                {cart.length !== 0 ? (
                    <div className={styles.buttonContainer}>
                        <div className={styles.actionButtonContainer}>
                            <Link href="/">
                                <button className={`${styles.actionButton} ${styles.continueShoppingButton}`}>Продовжити покупки</button>
                            </Link>
                        </div>
                        <button className={styles.actionButton} onClick={handleOrder}>Продовжити замовлення</button>
                    </div>
                ) : (
                    <div className={styles.emptyCartMessage}>
                        <p>Корзина порожня. Продовжуйте покупки!</p>
                        <Link href="/">
                            <button className={`${styles.actionButton} ${styles.continueShoppingButton}`}>Продовжити покупки</button>
                        </Link>
                    </div>
                )}
            </div>
            {cart.length !== 0 && (
                <div className={styles.grandTotal}>
                    Загальна сума: {calculateGrandTotal()}
                </div>
            )}
        </div>
    );
};

export default Cart;