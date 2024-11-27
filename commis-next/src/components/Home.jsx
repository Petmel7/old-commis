
import { getProducts } from '../services/products';
import { validateArray } from '@/utils/validation';
import ProductList from './Product/ProductList';
import SellerButton from './User/SellerButton';
import useLoadingAndError from '../hooks/useLoadingAndError';
import useFetchData from '@/hooks/useFetchData';

const Home = () => {
    const { data: rawProducts, loading, error } = useFetchData(getProducts);
    const products = validateArray(rawProducts)

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