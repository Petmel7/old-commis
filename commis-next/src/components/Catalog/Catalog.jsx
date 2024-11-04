
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProductsByCategory } from '@/services/catalog';
import ProductCard from '../Product/ProductCard';
import NoProducts from '../NoProducts/NoProducts';
import styles from './styles/Catalog.module.css';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { category } = router.query;

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                if (category) {
                    const response = await getProductsByCategory(category);
                    const { data } = response;

                    if (Array.isArray(data)) {
                        setProducts(data);
                        setError(null);
                    } else {
                        throw new Error('Очікувався масив, але отримано некоректну структуру.');
                    }
                }
            } catch (error) {
                setError(error.message);
                setProducts([]);
            }
        };
        fetchProductsByCategory();
    }, [category]);

    return (
        <>
            <h1 className={styles.productCategory}>Категорія: {category || 'Всі продукти'}</h1>
            {error ? (
                <p className={styles.errorMessage}>{error}</p> // Відображаємо повідомлення про помилку
            ) : (
                <ul className='product-list'>
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    ) : (
                        <NoProducts text='Немає продуктів для цієї категорії' />
                    )}
                </ul>
            )}
        </>
    );
};

export default Catalog;
