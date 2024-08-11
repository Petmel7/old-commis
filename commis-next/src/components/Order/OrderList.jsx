
import React, { useState, useEffect } from 'react';
import { getSellerOrders } from '../../services/order';
import { baseUrl } from '../Url/baseUrl';
import DeleteOrderList from './DeleteOrderList';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import BackButton from '../BackButton/BackButton';
import useModal from '@/hooks/useModal';
import Modal from '../Modal/Modal';
import styles from './styles/OrderList.module.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isModalOpen, openModal, closeModal } = useModal();

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
        return (
            <>
                <BackButton />
                <p className={styles.noOrders}>Поки що не має замовлень</p>
            </>
        )
    }

    return (
        <>
            <BackButton />
            <ul className={styles.orderList}>
                {orders.map(order => (
                    <li key={order.order_id} className={styles.orderItem}>
                        <h1 className={styles.orderTitle}>Покупець</h1>
                        <p className={styles.orderReplica}>імя:
                            <span className={styles.orderName}>{order.buyer_name}</span>
                        </p>
                        <p className={styles.orderReplica}>Email:
                            <span className={styles.orderEmail}>{order.buyer_email}</span>
                        </p>
                        <p className={styles.orderReplica}>Телефон:
                            <span className={styles.orderPhone}>{order.buyer_phone}</span>
                        </p>

                        <h2 className={styles.orderTitle}>Адреса</h2>
                        <p className={styles.orderReplica}>Область:
                            <span className={styles.orderShipping}>{order.shipping_address.region}</span>
                        </p>
                        <p className={styles.orderReplica}>Місто (Село):
                            <span className={styles.orderShipping}>{order.shipping_address.city}</span>
                        </p>
                        <p className={styles.orderReplica}>Нова пошта:
                            <span className={styles.orderShipping}>{order.shipping_address.postoffice}</span>
                        </p>

                        <ul className={styles.product}>
                            <h3 className={styles.orderTitle}>Замовлення</h3>
                            {order.products.map(product => (
                                <li key={`${order.order_id}-${product.product_name}`}>
                                    <button className={styles.productImageButton} onClick={openModal}>
                                        <img className={styles.productImage} src={`${baseUrl}${product.product_images[0]}`} alt={product.product_name} width="50" />
                                    </button>
                                    <Modal show={isModalOpen} onClose={closeModal}>
                                        <div
                                            className={styles.productImageModal}
                                            style={{
                                                backgroundImage: `url(${baseUrl}${product.product_images[0].replace(/\\/g, '/')})`
                                            }}
                                        ></div>
                                    </Modal>
                                    <p className={styles.orderReplica}>Назва:
                                        <span className={styles.productName}>{product.product_name}</span>
                                    </p>
                                    <p className={styles.orderReplica}>Ціна:
                                        <span className={styles.productPrice}>{product.product_price}</span>
                                    </p>
                                    <p className={styles.orderReplica}>Кількість:
                                        <span className={styles.productQuantity}>{product.quantity}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <DeleteOrderList orderId={order.order_id} fetchOrders={fetchOrders} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default OrderList;


