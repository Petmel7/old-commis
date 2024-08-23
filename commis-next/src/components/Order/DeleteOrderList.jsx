import { deleteOrder } from '../../services/order';
import styles from './styles/DeleteOrderList.module.css';

const DeleteOrderList = ({ orderId, fetchOrders }) => {

    console.log('DeleteOrderList->orderId', orderId);

    const hamdlerDelete = async (e) => {
        e.preventDefault();

        try {
            await deleteOrder(orderId);
            fetchOrders();
        } catch (error) {
            console.log('hamdlerDelete->error', error);
        }
    }
    return (
        <div className={styles.deleteOrderConteaner}>
            <button onClick={hamdlerDelete}>Видалити</button>
        </div>
    )
}

export default DeleteOrderList;