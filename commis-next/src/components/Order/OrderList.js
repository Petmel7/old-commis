
import React, { useState, useEffect } from 'react';
import { getSellerOrders } from '../../services/order';
import { baseUrl } from '../Url/baseUrl';
import styles from './styles/OrderList.module.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]); // Створюємо стан для збереження замовлень

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getSellerOrders();
                console.log('OrderList->orders', fetchedOrders);
                setOrders(fetchedOrders); // Оновлюємо стан замовленнями
            } catch (error) {
                console.log('OrderList->error', error);
            }
        }
        fetchOrders();
    }, []);

    return (
        <ul className={styles.orderList}>
            {orders.map(order => (
                <li key={order.order_id} className={styles.orderItem}>
                    <p className={styles.buyerName}>Покупець: {order.buyer_name}</p>
                    <p className={styles.buyerEmail}>Email: {order.buyer_email}</p>
                    <p className={styles.buyerPhone}>Телефон: {order.buyer_phone}</p>
                    <ul className={styles.product}>
                        {order.products.map(product => (
                            <li key={`${order.order_id}-${product.product_name}`}>
                                <p className={styles.productName}>Назва продукту: {product.product_name}</p>
                                <p className={styles.productPrice}>Ціна: {product.product_price}</p>
                                <p className={styles.productQuantity}>Кількість: {product.quantity}</p>
                                <img className={styles.productImage} src={`${baseUrl}${product.product_image}`} alt={product.product_name} width="50" />
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}

export default OrderList;

