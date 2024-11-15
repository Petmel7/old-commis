
import { useEffect, useState } from 'react';
import { getUserProducts } from '../../services/products';
import { baseUrl } from '../Url/baseUrl';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import BackButton from '../BackButton/BackButton';
import NoProducts from '../NoProducts/NoProducts';
import UserProductsCart from './UserProductsCart';

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
                    <UserProductsCart
                        productId={product.id}
                        pathProductId={`/products/userDetails/${product.id}`}
                        productImages={`${baseUrl}${product.images[0]}`}
                        productNames={product.name}
                        productPrices={product.price}
                    />
                ))}
            </ul>
        </>
    );
};

export default UserProducts;