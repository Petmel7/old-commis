import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserProducts } from '../../services/products';
import { baseUrl } from '../Url/baseUrl';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import DeleteProduct from './DeleteProduct';
import Slider from 'react-slick';
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <ul className={styles.productList}>
            {userProducts.map(product => (
                <li key={product.id} className={styles.productItem}>
                    <div className={styles.productCard}>
                        <Slider {...settings} className={styles.slider}>
                            {product.images.map((image, index) => (
                                <div key={index} className={styles.imageContainer}>
                                    <img className={styles.productImage} src={`${baseUrl}${image}`} alt={product.name} />
                                </div>
                            ))}
                        </Slider>
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.productDescription}>{product.description}</p>
                        <p className={styles.productPrice}>Ціна: {product.price} грн</p>
                        <DeleteProduct productId={product.id} fetchProducts={fetchProducts} />
                        <Link href={`/products/update/${product.id}`}>
                            <button className={styles.editButton}>Редагувати</button>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UserProducts;

