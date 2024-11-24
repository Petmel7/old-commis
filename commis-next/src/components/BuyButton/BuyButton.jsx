import { useRouter } from "next/router";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from '../Product/styles/ProductCard.module.css';

const BuyButton = ({ product, selectedSize }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const router = useRouter();

    const handleBuy = async () => {
        setLoading(true);
        setError(null);

        try {
            if (!selectedSize) {
                alert('Будь ласка, виберіть розмір перед додаванням в кошик.');
                return;
            }

            addToCart(product, selectedSize);

            router.push('/cart');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button className={styles.productCardButton} onClick={handleBuy} disabled={loading}>
                {loading ? 'Завантаження...' : 'Купити'}
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>} {/* Відображення помилки */}
        </>
    );
};

export default BuyButton;
