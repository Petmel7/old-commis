import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import ProductList from './Product/ProductList';
import SellerButton from './User/SellerButton';
import useLoadingAndError from '../hooks/useLoadingAndError';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();

    }, []);

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <>
            <SellerButton />
            <ProductList products={products} />
        </>
    );
};

export default Home;