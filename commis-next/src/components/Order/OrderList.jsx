
import Link from "next/link";
import { getSellerOrders } from '../../services/order';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import BackButton from '../BackButton/BackButton';
import NoProducts from '../NoProducts/NoProducts';
import styles from './styles/OrderList.module.css';

import useFetchData from '@/hooks/useFetchData';

const OrderList = () => {

    const { data: orders, loading, error } = useFetchData(getSellerOrders);
    console.log('OrderList->orders', orders);

    const loadingErrorComponent = useLoadingAndError(loading, error);

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
                        <Link href={`/order/order-details/${order.order_id}`}>
                            {console.log('order', order)}
                            {order.buyer_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default OrderList;