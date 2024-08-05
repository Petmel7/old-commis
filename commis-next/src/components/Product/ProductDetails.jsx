
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProductById } from '../../services/products';
import { baseUrl } from '../Url/baseUrl';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/ProductDetails.module.css';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { productId } = router.query;

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        if (productId) {
            const fetchProductById = async () => {
                try {
                    const productData = await getProductById(productId);
                    setProduct(productData);
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };

            fetchProductById();
        }
    }, [productId]);

    if (loadingErrorComponent) return loadingErrorComponent;

    if (!product) return <p>Продукт не знайдено</p>;

    return (
        <div className={styles.productDetails}>
            <img className={styles.productImage} src={`${baseUrl}${product.image}`} alt={product.name} />
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Ціна: {product.price} грн</p>
        </div>
    );
};

export default ProductDetails;
