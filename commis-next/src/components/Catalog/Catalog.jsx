
import { useRouter } from 'next/router';
import { getProductsByCategory } from '@/services/catalog';
import useFetchDataByKey from '@/hooks/useFetchDataByKey';
import useLoadingAndError from '@/hooks/useLoadingAndError';
import ProductCard from '../Product/ProductCard';
import NoProducts from '../NoProducts/NoProducts';
import styles from './styles/Catalog.module.css';

const Catalog = () => {
    const router = useRouter();
    const { category } = router.query;
    const { data: products, loading, error } = useFetchDataByKey(getProductsByCategory, category);
    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

    return (
        <>
            <h1 className={styles.productCategory}>Категорія: {category || 'Всі продукти'}</h1>
            {products && products.length > 0 ? (
                <ul className='product-list'>
                    {products.map(product => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </ul>
            ) : (
                <NoProducts text='Немає продуктів для цієї категорії' />
            )}
        </>
    );
};


export default Catalog;
