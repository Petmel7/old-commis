
import React, { useState, useEffect } from 'react';
import { getSellerOrders } from '../../services/order';
import { baseUrl } from '../Url/baseUrl';
import DeleteOrderList from './DeleteOrderList';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/OrderList.module.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const fetchOrders = async () => {
        try {
            const fetchedOrders = await getSellerOrders();
            console.log('OrderList->fetchedOrders', fetchedOrders);
            setOrders(fetchedOrders);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loadingErrorComponent) return loadingErrorComponent;

    console.log('OrderList->orders', orders);

    if (orders.length === 0) {
        return <p className={styles.noOrders}>Поки що не має замовлень</p>;
    }

    return (
        <ul className={styles.orderList}>
            {orders.map(order => (
                <li key={order.order_id} className={styles.orderItem}>
                    <p className={styles.buyerName}>Покупець: {order.buyer_name}</p>
                    <p className={styles.buyerEmail}>Email: {order.buyer_email}</p>
                    <p className={styles.buyerPhone}>Телефон: {order.buyer_phone}</p>
                    <p className={styles.shippingAddress}>Область: {order.shipping_address.region}</p>
                    <p className={styles.shippingAddress}>Місто (Село): {order.shipping_address.city}</p>
                    <p className={styles.shippingAddress}>Адреса: {order.shipping_address.postoffice}</p>
                    <ul className={styles.product}>
                        {order.products.map(product => (
                            <li key={`${order.order_id}-${product.product_name}`}>
                                <img className={styles.productImage} src={`${baseUrl}${product.product_image}`} alt={product.product_name} width="50" />
                                <p className={styles.productName}>Назва: {product.product_name}</p>
                                <p className={styles.productPrice}>Ціна: {product.product_price}</p>
                                <p className={styles.productQuantity}>Кількість: {product.quantity}</p>
                            </li>
                        ))}
                    </ul>
                    <DeleteOrderList orderId={order.order_id} fetchOrders={fetchOrders} />
                </li>
            ))}
        </ul>
    );
}

export default OrderList;


