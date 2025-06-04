
import { useRouter } from 'next/router';
import { getProductsByCategory } from '@/services/catalog';
import { validateArray } from '@/utils/validation';
import useFetchDataWithArg from '@/hooks/useFetchDataWithArg';
import useLoadingAndError from '@/hooks/useLoadingAndError';
import ProductCard from '../Product/ProductCard';
import NoProducts from '../NoProducts/NoProducts';
import styles from './styles/Catalog.module.css';

const Catalog = () => {
    const router = useRouter();
    const { category } = router.query;

    const { data: rawProducts, loading, error } = useFetchDataWithArg(getProductsByCategory, category);
    const products = validateArray(rawProducts);

    console.log('Catalog->products', products);

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
