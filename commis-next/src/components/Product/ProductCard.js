
import React from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import { baseUrl } from '../Url/baseUrl';
import styles from './styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleBuy = () => {
        addToCart(product);
        router.push('/cart');
    };

    return (
        <div className={styles.productCard}>
            <img className={styles.productCardImage} src={`${baseUrl}${product.image}`} alt={product.name} />
            <h2 className={styles.productCardName}>{product.name}</h2>
            <p className={styles.productCardDescription}>{product.description}</p>
            <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>
            <button onClick={handleBuy}>Купити</button>
        </div>
    );
};

export default ProductCard;
