import { deleteOrder } from '../../services/order';

const DeleteOrderList = ({ orderId, fetchOrders }) => {

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
        <button onClick={hamdlerDelete}>Видалити</button>
    )
}

export default DeleteOrderList;