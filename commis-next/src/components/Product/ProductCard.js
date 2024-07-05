
import React from 'react';
import styles from './styles/ProductCard.module.css';

const baseUrl = 'http://localhost:5000/';

const ProductCard = ({ product }) => (
    <li className={styles.productCard}>
        <img className={styles.productCardImage} src={`${baseUrl}${product.image}`} alt={product.name} />
        <h2 className={styles.productCardName}>{product.name}</h2>
        <p className={styles.productCardDescription}>{product.description}</p>
        <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>
    </li>
);

export default ProductCard;