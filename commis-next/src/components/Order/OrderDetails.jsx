
import { useRouter } from 'next/router';
import { getSellerOrderById } from '@/services/order';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import useCheckUserBlocked from '@/hooks/useCheckUserBlocked';
import useFetchDataWithArg from '@/hooks/useFetchDataWithArg';
import OrderPreview from "./OrderPreview";
import BackButton from '../BackButton/BackButton';
import styles from './styles/OrderList.module.css';

const OrderDetails = () => {
    const router = useRouter();
    const { orderId } = router.query;

    const loadingBlocked = useCheckUserBlocked();
    const { data: order, loading, error } = useFetchDataWithArg(getSellerOrderById, orderId)

    const loadingErrorComponent = useLoadingAndError(loading, error);
    if (loadingBlocked || !orderId) return null;
    if (loadingErrorComponent) return loadingErrorComponent;

    if (!order) return <p>Замовлення не знайдено</p>;

    return (
        <>
            <BackButton />
            <div className={styles.orderItem}>
                <OrderPreview order={order} />
            </div>
        </>
    );
};

export default OrderDetails;
