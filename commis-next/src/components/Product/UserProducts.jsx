
import { getUserProducts } from '../../services/products';
import { useAuth } from '@/context/AuthContext';
import useCheckUserBlocked from '@/hooks/useCheckUserBlocked';
import UserStatusText from '../UserStatusText/UserStatusText';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import BackButton from '../BackButton/BackButton';
import NoProducts from '../NoProducts/NoProducts';
import UserProductsCart from './UserProductsCart';
import useFetchDataWithArg from '@/hooks/useFetchDataWithArg';
import PaginationControls from '../Pagination/PaginationControls';
import styles from './styles/ProductList.module.css';

const UserProducts = () => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const { isBlocked } = useAuth();
    const loadingBlocked = useCheckUserBlocked();

    const {
        data: userProducts,
        loading,
        error,
        page,
        setPage,
        totalPages
    } = useFetchDataWithArg(getUserProducts, accessToken);

    const loadingErrorComponent = useLoadingAndError(loading, error);
    if (loadingBlocked) return null;
    if (isBlocked) return <UserStatusText />;
    if (loadingErrorComponent) return loadingErrorComponent;

    console.log('userProducts', userProducts);

    if (userProducts.length === 0) {
        return (
            <NoProducts
                text='Поки що немає продуктів'
                buttonLink='/'
                buttonText='Додати продукт'
            />
        );
    }

    console.log('userProducts', userProducts);

    return (
        <>
            <BackButton />
            <ul className={styles.productList}>
                {userProducts.map(product => (
                    <li className={styles.productCardWrapper} key={product.id}>
                        <UserProductsCart
                            productImages={product.images[0]}
                            pathProductId={`/products/userDetails/${product.id}`}
                            productNames={product.name}
                            productPrices={product.price}
                        />
                    </li>
                ))}
            </ul>
            <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </>
    );
};

export default UserProducts;
