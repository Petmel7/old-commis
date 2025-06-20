import { useState } from 'react';
import CancelOrderBySeller from './CancelOrderBySeller';
import Modal from '../Modal/Modal';
import styles from './styles/OrderList.module.css';

const OrderPreview = ({ order }) => {
    const [modalState, setModalState] = useState({ viewImage: null, cancelOrder: null });

    const openImageModal = () => setModalState(prev => ({ ...prev, viewImage: order.order_id }));
    const openCancelModal = () => setModalState(prev => ({ ...prev, cancelOrder: order.order_id }));
    const closeModal = () => setModalState({ viewImage: null, cancelOrder: null });

    return (
        <>
            <h1 className={styles.orderTitle}>Покупець</h1>
            <p className={styles.orderReplica}>ім'я: <span className={styles.orderName}>{order.buyer_name}</span></p>
            <p className={styles.orderReplica}>Email: <span className={styles.orderEmail}>{order.buyer_email}</span></p>
            <p className={styles.orderReplica}>Телефон: <span className={styles.orderPhone}>{order.buyer_phone}</span></p>

            <h2 className={styles.orderTitle}>Адреса</h2>
            <p className={styles.orderReplica}>Область: <span>{order.shipping_address.region}</span></p>
            <p className={styles.orderReplica}>Місто: <span>{order.shipping_address.city}</span></p>
            <p className={styles.orderReplica}>Нова пошта: <span>{order.shipping_address.post_office}</span></p>

            <ul className={styles.product}>
                <h3 className={styles.orderTitle}>Замовлення</h3>
                {order.products.map((product, index) => (
                    <li key={index}>
                        <button className={styles.productImageButton} onClick={openImageModal}>
                            <img className={styles.productImage} src={product.product_images[0]} alt={product.product_name} width="50" />
                        </button>
                        <Modal show={modalState.viewImage === order.order_id} onClose={closeModal}>
                            <div
                                className={styles.productImageModal}
                                style={{ backgroundImage: `url(${product.product_images[0].replace(/\\/g, '/')})` }}
                            ></div>
                        </Modal>
                        <p className={styles.orderReplica}>Назва: <span>{product.product_name}</span></p>
                        <p className={styles.orderReplica}>Ціна: <span>{product.product_price}</span></p>
                        <p className={styles.orderReplica}>Розмір: <span>{product.product_size}</span></p>
                        <p className={styles.orderReplica}>Кількість: <span>{product.quantity}</span></p>
                    </li>
                ))}
            </ul>

            <div>
                <h3 className={styles.orderTitle}>Оплата</h3>
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
                <button className={styles.modalButtonOpen} onClick={openCancelModal}>Скасувати замовлення</button>
            </div>
            <Modal show={modalState.cancelOrder === order.order_id} onClose={closeModal}>
                <div className={styles.modalContainer}>
                    <p className={styles.modalText}>Ви справді хочете скасувати це замовлення?</p>
                    <div className={styles.modalButtonContainer}>
                        <CancelOrderBySeller orderId={order.order_id} orders={[order]} setData={() => router.push('/orderList')} />
                        <button className={styles.modalButtonClose} onClick={closeModal}>Закрити</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default OrderPreview;