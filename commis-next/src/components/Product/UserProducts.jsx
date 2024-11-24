
import { getUserProducts } from '../../services/products';
import { baseUrl } from '../Url/baseUrl';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import BackButton from '../BackButton/BackButton';
import NoProducts from '../NoProducts/NoProducts';
import UserProductsCart from './UserProductsCart';
import useFetchData from '@/hooks/useFetchData';

const UserProducts = () => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const { data: userProducts = [], loading, error } = useFetchData(getUserProducts, accessToken);

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
                            productImages={`${baseUrl}${product.images[0]}`}
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
