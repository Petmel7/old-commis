
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProductsByCategory } from '@/services/catalog';
import ProductCard from '../Product/ProductCard';
import styles from './styles/Catalog.module.css';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const { category } = router.query;
    console.log('Catalog->category', category);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                if (category) {
                    const data = await getProductsByCategory(category);
                    console.log('Catalog->data', data);
                    setProducts(data);
                }
            } catch (error) {
                console.log('Catalog->error', error);
            }
        }
        fetchProductsByCategory();
    }, [category]);

    return (
        <ul className='product-list'>
            <h1 className={styles.productCategory}>Категорія: {category || 'Всі продукти'}</h1>

            {products.map(product => (
                <ProductCard product={product} />
            ))}
        </ul>
    );
};

export default Catalog;