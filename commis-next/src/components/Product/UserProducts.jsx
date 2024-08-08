
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserProducts } from '../../services/products';
import { baseUrl } from '../Url/baseUrl';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/UserProducts.module.css';

const UserProducts = () => {
    const [userProducts, setUserProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const fetchProducts = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const data = await getUserProducts(accessToken);
            setUserProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <ul className={styles.productList}>
            {userProducts.map(product => (
                <li key={product.id} className={styles.productItem}>
                    <div className={styles.productCard}>
                        <Link href={`/products/userDetails/${product.id}`}>
                            <div className={styles.imageContainer}>
                                <img
                                    className={styles.productImage}
                                    src={`${baseUrl}${product.images[0]}`}
                                    alt={product.name}
                                />
                            </div>
                        </Link>
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.productPrice}>Ціна: {product.price} грн</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UserProducts;
