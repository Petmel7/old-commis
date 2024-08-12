import { useRouter } from "next/router";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from '../Product/styles/ProductCard.module.css';

const BuyButton = ({ product }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const router = useRouter();

    const handleBuy = async () => {
        setLoading(true);
        setError(null);

        try {
            addToCart(product);
            router.push('/cart');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className={styles.productCardButton} onClick={handleBuy}>
            {loading ? 'Завантаження...' : 'Купити'}
        </button>
    )
}

export default BuyButton;
