import { useState, useRouter } from "next/router";
import { useEffect } from "react";
import { getProductById } from '../../services/products';
import { baseUrl } from '../../components/Url/baseUrl';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from '../../components/Product/styles/ProductDetails.module.css';

const ProductDetails = () => {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { productDetailsId } = router.query;

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        if (productDetailsId) {
            const fetchProductById = async () => {
                try {
                    const productData = await getProductById(productDetailsId);
                    setProduct(productData);
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            }

            fetchProductById();
        }
    }, [productDetailsId]);

    if (loadingErrorComponent) return loadingErrorComponent;

    if (!product) return <p>Продукт не знайдено</p>;

    return (
        <div className={styles.productDetails}>
            <img className={styles.productImage} src={`${baseUrl}${product.image}`} alt={product.name} />
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Ціна: {product.price} грн</p>
        </div>
    )
}

export default ProductDetails;