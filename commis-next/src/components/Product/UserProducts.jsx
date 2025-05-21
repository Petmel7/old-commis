
import { getUserProducts } from '../../services/products';
import { getServerUrl } from '@/utils/env';
import { validateArray } from '@/utils/validation';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import BackButton from '../BackButton/BackButton';
import NoProducts from '../NoProducts/NoProducts';
import UserProductsCart from './UserProductsCart';
import useFetchDataWithArg from '@/hooks/useFetchDataWithArg';

const UserProducts = () => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

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
        )
    }

    return (
        <>
            <BackButton />
            <ul className='product-list'>
                {userProducts.map(product => (
                    <li key={product.id} className='product-item'>
                        <UserProductsCart
                            pathProductId={`/products/userDetails/${product.id}`}
                            // productImages={`${getServerUrl()}/${product.images[0]}`}
                            productImages={
                                Array.isArray(product.images) && product.images.length > 0
                                    ? `${getServerUrl()}/${product.images[0]}`
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
