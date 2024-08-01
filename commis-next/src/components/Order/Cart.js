
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { baseUrl } from '../Url/baseUrl';
import DeleteOrder from './DeleteOrder';
import styles from './styles/Cart.module.css';

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity } = useCart();
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    console.log('Cart->cart', cart);

    const handleOrderClick = async (e) => {
        e.preventDefault();

        if (isAuthenticated) {
            router.push('/placingAnOrder');
        } else {
            router.push('/login');
        }
    };

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    const calculateGrandTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Корзина</h1>
            {cart.map(item => (
                <div className={styles.cartContainer} key={item.id}>
                    <div className={styles.cartItem}>
                        <div>
                            <img className={styles.cartImage} src={`${baseUrl}${item.image}`} alt={item.name} />
                        </div>

                        <div className={styles.quantityContainer}>
                            <div className={styles.quantityButtonContainer}>
                                <button className={styles.quantityButton} onClick={() => decreaseQuantity(item.id)}>-</button>
                                <span className={styles.quantity}>{item.quantity}</span>
                                <button className={styles.quantityButton} onClick={() => increaseQuantity(item.id)}>+</button>
                            </div>

                            <DeleteOrder productId={item.id} />
                        </div>
                    </div>
                    <div className={styles.cartPriceContainer}>
                        <p className={styles.itemName}>{item.name}</p>
                        <span className={styles.cartPrice}>Ціна за одиницю: {item.price}</span>
                        <span className={styles.totalPrice}>Загальна ціна: {calculateTotalPrice(item)}</span>
                    </div>
                </div>
            ))}
            <div>
                {cart.length !== 0 ? (
                    <div className={styles.buttonContainer}>
                        <div className={styles.actionButtonContainer}>
                            <Link href="/">
                                <button className={`${styles.actionButton} ${styles.continueShoppingButton}`}>Продовжити покупки</button>
                            </Link>
                        </div>
                        <button className={styles.actionButton} onClick={handleOrderClick}>Oформити замовлення</button>
                    </div>
                ) : (
                    <div className={styles.emptyCartMessage}>
                        <p>Корзина порожня. Продовжуйте покупки!</p>
                        <Link href="/">
                            <button className={`${styles.actionButton} ${styles.continueShoppingButton}`}>Продовжити покупки</button>
                        </Link>
                    </div>
                )}
            </div>
            {cart.length !== 0 && (
                <div className={styles.grandTotal}>
                    Загальна сума: {calculateGrandTotal()}
                </div>
            )}
        </div>
    );
};

export default Cart;
