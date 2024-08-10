
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { baseUrl } from "../Url/baseUrl";
import styles from './styles/Cart.module.css';

const ThanksForTheOrder = () => {
    const { cart, clearCart } = useCart();

    useEffect(() => {
        if (cart.length > 0) {
            const handleUnload = () => {
                clearCart();
            };

            window.addEventListener('beforeunload', handleUnload);
            window.addEventListener('unload', handleUnload);

            return () => {
                window.removeEventListener('beforeunload', handleUnload);
                window.removeEventListener('unload', handleUnload);
                clearCart();
            };
        }
    }, [cart, clearCart]);

    console.log('ThanksForTheOrder->cart', cart);

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    return (
        <div>
            <h3 className={styles.cartTitle}>Дякую за покупку!</h3>
            <p className={styles.cartTitle}>Скоро з вами зв'яжеться продавець</p>
            <p className={styles.cartTitle}>Ваше замовлення</p>
            {cart.map(item => (
                <div className={styles.cartContainer} key={item.id}>
                    <div className={styles.cartImageContainer}>
                        <img className={styles.cartImage} src={`${baseUrl}${item.images[0]}`} alt={item.name} />
                    </div>
                    <div className={styles.cartPriceContainer}>
                        <p className={styles.itemName}>{item.name}</p>
                        <span className={styles.cartPrice}>Ціна за одиницю: {item.price}</span>
                        <span className={styles.totalPrice}>Загальна ціна: {calculateTotalPrice(item)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ThanksForTheOrder;
