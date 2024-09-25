
import React, { useState, useEffect } from 'react';
import { getSellerOrders } from '../../services/order';
import { baseUrl } from '../Url/baseUrl';
import DeleteOrderList from './DeleteOrderList';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import BackButton from '../BackButton/BackButton';
import Modal from '../Modal/Modal';
import NoProducts from '../NoProducts/NoProducts';
import styles from './styles/OrderList.module.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Стан для зберігання, чи відкрито модальне вікно для перегляду зображення або видалення
    const [modalState, setModalState] = useState({
        viewImage: null,  // Для зображення продукту
        deleteOrder: null // Для видалення замовлення
    });

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const fetchOrders = async () => {
        try {
            const fetchedOrders = await getSellerOrders();
            setOrders(fetchedOrders);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Функція для відкриття модального вікна з зображенням
    const openImageModal = (orderId) => {
        setModalState({ ...modalState, viewImage: orderId });
    };

    // Функція для відкриття модального вікна для видалення
    const openDeleteModal = (orderId) => {
        setModalState({ ...modalState, deleteOrder: orderId });
    };

    // Функція для закриття будь-якого модального вікна
    const closeModal = () => {
        setModalState({ viewImage: null, deleteOrder: null });
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    if (orders.length === 0) {
        return <NoProducts text="Поки що не має замовлень" />;
    }

    console.log('OrderList->orders', orders);

    return (
        <>
            <BackButton />
            <ul className={styles.orderList}>
                {orders.map(order => (
                    <li key={order.order_id} className={styles.orderItem}>
                        <h1 className={styles.orderTitle}>Покупець</h1>
                        <p className={styles.orderReplica}>ім'я:
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
                                    <button className={styles.productImageButton} onClick={() => openImageModal(order.order_id)}>
                                        <img className={styles.productImage} src={`${baseUrl}${product.product_images[0]}`} alt={product.product_name} width="50" />
                                    </button>
                                    <Modal show={modalState.viewImage === order.order_id} onClose={closeModal}>
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

                        <div className={styles.buttonContainer}>
                            <button className={styles.modalButtonOpen} onClick={() => openDeleteModal(order.order_id)}>Видалити</button>
                        </div>
                        <Modal show={modalState.deleteOrder === order.order_id} onClose={closeModal}>
                            <div className={styles.modalContainer}>
                                <p className={styles.modalText}>Ви справді хочете видалити це замовлення?</p>
                                <div className={styles.modalButtonContainer}>
                                    <DeleteOrderList orderId={order.order_id} fetchOrders={fetchOrders} />
                                    <button className={styles.modalButtonClose} onClick={closeModal}>Скасувати</button>
                                </div>
                            </div>
                        </Modal>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default OrderList;


