import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserProducts } from '../../services/products';
import { baseUrl } from '../Url/baseUrl';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import DeleteProduct from './DeleteProduct';
import styles from './styles/ProductCard.module.css';

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
        <ul>
            {userProducts.map(product => (
                <li key={product.id}>
                    <div className={styles.productCard}>
                        <div className={styles.productCardImageContainer}>
                            <img className={styles.productCardImage} src={`${baseUrl}${product.image}`} alt={product.name} />
                        </div>
                        <h2 className={styles.productCardName}>{product.name}</h2>
                        <p className={styles.productCardDescription}>{product.description}</p>
                        <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>
                        <DeleteProduct productId={product.id} fetchProducts={fetchProducts} />
                        <Link href={`/products/update/${product.id}`}>
                            <button className={styles.productCardButton}>Редагувати</button>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UserProducts;

