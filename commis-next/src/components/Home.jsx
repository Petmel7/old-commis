
import { getProducts } from '../services/products';
import ProductList from './Product/ProductList';
import SellerButton from './User/SellerButton';
import useLoadingAndError from '../hooks/useLoadingAndError';
import useFetchData from '@/hooks/useFetchData';

const Home = () => {
    const { data: products = [], loading, error } = useFetchData(getProducts);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <>
            <SellerButton />
            <ProductList products={products} />
        </>
    );
};

export default Home;