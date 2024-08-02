
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import { baseUrl } from '../Url/baseUrl';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

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

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div className={styles.productCard}>
            <div className={styles.productCardImageContainer}>
                <img className={styles.productCardImage} src={`${baseUrl}${product.image}`} alt={product.name} />
            </div>
            <h2 className={styles.productCardName}>{product.name}</h2>
            <p className={styles.productCardDescription}>{product.description}</p>
            <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>
            <button className={styles.productCardButton} onClick={handleBuy}>Купити</button>
        </div>
    );
};

export default ProductCard;

