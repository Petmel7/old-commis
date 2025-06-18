
import { useState, useEffect } from 'react';
import { getSellerOrders } from '../../services/order';
import { useAuth } from '@/context/AuthContext';
import useCheckUserBlocked from '@/hooks/useCheckUserBlocked';
import UserStatusText from '../UserStatusText/UserStatusText';
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

    const [modalState, setModalState] = useState({
        viewImage: null,
        deleteOrder: null
    });

    const loadingBlocked = useCheckUserBlocked();
    const { isBlocked } = useAuth();

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const fetchedOrders = await getSellerOrders();
            console.log('fetchedOrders', fetchedOrders);
            setOrders(fetchedOrders);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const openImageModal = (orderId) => {
        setModalState({ ...modalState, viewImage: orderId });
    };

    const openDeleteModal = (orderId) => {
        setModalState({ ...modalState, deleteOrder: orderId });
    };

    const closeModal = () => {
        setModalState({ viewImage: null, deleteOrder: null });
    };

    if (loadingBlocked) return null;
    if (isBlocked) return <UserStatusText />;
    if (loadingErrorComponent) return loadingErrorComponent;

    if (orders.length === 0) {
        return <NoProducts text="Поки що не має замовлень" />;
    }

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
                                        <img className={styles.productImage} src={product.product_images[0]} alt={product.product_name} width="50" />
                                    </button>
                                    <Modal show={modalState.viewImage === order.order_id} onClose={closeModal}>
                                        <div
                                            className={styles.productImageModal}
                                            style={{
                                                backgroundImage: `url(${product.product_images[0].replace(/\\/g, '/')})`
                                            }}
                                        ></div>
                                    </Modal>
                                    <p className={styles.orderReplica}>Назва:
                                        <span>{product.product_name}</span>
                                    </p>
                                    <p className={styles.orderReplica}>Ціна:
                                        <span>{product.product_price}</span>
                                    </p>
                                    <p className={styles.orderReplica}>Розмір:
                                        <span>{product.product_size}</span>
                                    </p>
                                    <p className={styles.orderReplica}>Кількість:
                                        <span>{product.quantity}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <div>
                            <h3 className={styles.orderTitle}>Доставка</h3>
                            <p className={styles.orderReplica}>
                                Статус: {
                                    order.payment?.status === 'cash_on_delivery'
                                        ? 'Оплата при отриманні'
                                        : order.payment?.status === 'pending'
                                            ? 'Очікує передоплату'
                                            : order.payment?.status === 'paid'
                                                ? 'Оплачено'
                                                : 'Невідомо'
                                }
                            </p>
                        </div>

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
