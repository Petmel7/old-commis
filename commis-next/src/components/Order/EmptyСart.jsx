import Link from "next/link";
import styles from './styles/Cart.module.css';
import cartImg from '../../../public/png/unnamed.png';

const EmptyCart = () => (
    <div className={styles.emptyCartMessage}>
        <p>Корзина порожня. Продовжуйте покупки!</p>
        <img className={styles.cartImg} src={cartImg.src} alt="Кошик" />
        <Link href="/" >
            <button className={`${styles.actionButton} ${styles.continueShoppingButton}`}>Продовжити покупки</button>
        </Link>
    </div>
);

export default EmptyCart;