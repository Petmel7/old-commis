import { cancelOrderBySeller } from '@/services/order';
import { getSellerOrders } from '@/services/order';
import styles from './styles/DeleteOrderList.module.css';

const CancelOrderBySeller = ({ orderId, setData }) => {

    const hamdlerCancelOrder = async (e) => {
        e.preventDefault();

        try {
            await cancelOrderBySeller(orderId);
            const updated = await getSellerOrders();
            setData(updated);
        } catch (error) {
            console.log('hamdlerDelete->error', error);
        }
    }
    return (
        <div className={styles.deleteOrderConteaner}>
            <button
                className={styles.deleteOrderList}
                onClick={hamdlerCancelOrder}>
                Скасувати
            </button>
        </div>
    )
}

export default CancelOrderBySeller;