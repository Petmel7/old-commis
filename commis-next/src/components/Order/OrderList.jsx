
import Link from "next/link";
import { useState } from "react";
import { getSellerOrders } from '../../services/order';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import useFetchData from '@/hooks/useFetchData';
import OrderPreview from "./OrderPreview";
import BackButton from '../BackButton/BackButton';
import NoProducts from '../NoProducts/NoProducts';
import styles from './styles/OrderList.module.css';

const OrderList = () => {
    const { data: orders, loading, error } = useFetchData(getSellerOrders);
    const [filter, setFilter] = useState(null); // null | 'paid' | 'cod'
    const [viewAll, setViewAll] = useState(false);

    const loadingErrorComponent = useLoadingAndError(loading, error);
    if (loadingErrorComponent) return loadingErrorComponent;

    if (orders.length === 0) {
        return <NoProducts text="Поки що не має замовлень" />;
    }

    const paidOrders = orders.filter(order => order.payment?.status === 'paid');
    const codOrders = orders.filter(order => order.payment?.status === 'cash_on_delivery');

    const filteredOrders = filter === 'paid' ? paidOrders : filter === 'cod' ? codOrders : [];

    return (
        <>
            <BackButton />

            <div className={styles.filterContainer}>
                <button onClick={() => { setFilter('paid'); setViewAll(false); }} className={styles.filterButton}>
                    Список замовлень з передплатою ({paidOrders.length})
                </button>
                <button onClick={() => { setFilter('cod'); setViewAll(false); }} className={styles.filterButton}>
                    Список замовлень з післяплатою ({codOrders.length})
                </button>
            </div>

            {!filter && <p className={styles.selectPrompt}>Оберіть тип замовлень для перегляду</p>}

            {filter && (
                <>
                    <button onClick={() => setViewAll(!viewAll)} className={styles.toggleButton}>
                        {viewAll ? 'Показати список замовлень' : 'Показати всі деталі замовлень'}
                    </button>

                    {viewAll ? (
                        <div className={styles.orderDetailsList}>
                            {filteredOrders.map(order => (
                                <div key={order.order_id} className={styles.orderItem}>
                                    <OrderPreview order={order} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ul className={styles.orderList}>
                            {filteredOrders.map(order => (
                                <li key={order.order_id} className={styles.orderItem}>
                                    <Link href={`/order/order-details/${order.order_id}`}>
                                        {console.log('Link->order', order)}
                                        <div className={styles.orderItemBlock}>
                                            <img className={styles.productImage} src={order.products[0].product_images[0]} alt={order.products[0].product_name} width="50" />
                                            <p>Назва: {order.products[0].product_name}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                            {filteredOrders.length === 0 && <p className={styles.noOrders}>Немає замовлень за цим типом</p>}
                        </ul>
                    )}
                </>
            )}
        </>
    );
};

export default OrderList;

