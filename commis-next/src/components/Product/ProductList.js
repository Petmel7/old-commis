import React from 'react';
import ProductCard from './ProductCard';
import styles from './styles/ProductCard.module.css';

const ProductList = ({ products }) => (
    <ul className={styles.productList}>
        {products.map(product => (
            <li className={styles.productChildren} key={product.id}>
                <ProductCard product={product} />
            </li>
        ))}
    </ul>
);

export default ProductList;