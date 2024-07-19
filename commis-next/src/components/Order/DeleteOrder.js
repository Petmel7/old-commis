import { useCart } from '../../context/CartContext';
import DeleteIcon from '../../../public/img/delete.svg';
import styles from './styles/Cart.module.css';

const DeleteOrder = ({ productId }) => {

    const { removeFromCart } = useCart();

    const handleDelete = (e) => {
        e.preventDefault();
        removeFromCart(productId);
    };

    return (
        <button className={styles.deleteOrder} type="button" onClick={handleDelete}>
            <DeleteIcon />
        </button>
    )
}

export default DeleteOrder;