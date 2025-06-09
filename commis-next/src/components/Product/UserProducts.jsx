
import { getUserProducts } from '../../services/products';
import { getServerUrl } from '@/utils/env';
import { validateArray } from '@/utils/validation';
import { useAuth } from '@/context/AuthContext';
import useCheckUserBlocked from '@/hooks/useCheckUserBlocked';
import UserStatusText from '../UserStatusText/UserStatusText';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import BackButton from '../BackButton/BackButton';
import NoProducts from '../NoProducts/NoProducts';
import UserProductsCart from './UserProductsCart';
import useFetchDataWithArg from '@/hooks/useFetchDataWithArg';

const UserProducts = () => {
    const loadingBlocked = useCheckUserBlocked();
    const { isBlocked } = useAuth();

    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    if (loadingBlocked) return null;

    if (isBlocked) return <UserStatusText />;

    const { data: rawUserProducts, loading, error } = useFetchDataWithArg(getUserProducts, accessToken);
    const userProducts = validateArray(rawUserProducts);

    const loadingErrorComponent = useLoadingAndError(loading, error);
    if (loadingErrorComponent) return loadingErrorComponent;

    if (userProducts.length === 0) {
        return (
            <NoProducts
                text='Поки що немає продуктів'
                buttonLink='/'
                buttonText='Додати продукт'
            />
        );
    }

    return (
        <>
            <BackButton />
            <ul className='product-list'>
                {userProducts.map(product => (
                    <li key={product.id} className='product-item'>
                        <UserProductsCart
                            pathProductId={`/products/userDetails/${product.id}`}
                            productImages={
                                Array.isArray(product.images) && product.images.length > 0
                                    ? product.images[0]
                                    : `${getServerUrl()}/img/fallback.jpg`
                            }
                            productNames={product.name}
                            productPrices={product.price}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default UserProducts;

