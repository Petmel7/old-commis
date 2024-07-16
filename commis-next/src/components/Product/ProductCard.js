
import React from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import styles from './styles/ProductCard.module.css';

const baseUrl = 'http://localhost:5000/';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleBuy = () => {
        addToCart(product);
        router.push('/cart');
    };

    return (
        <li className={styles.productCard}>
            <img className={styles.productCardImage} src={`${baseUrl}${product.image}`} alt={product.name} />
            <h2 className={styles.productCardName}>{product.name}</h2>
            <p className={styles.productCardDescription}>{product.description}</p>
            <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>
            <button onClick={handleBuy}>Купити</button>
        </li>
    );
};

export default ProductCard;
