
import { getProducts } from '../services/products';
import ProductList from './Product/ProductList';
import SellerButton from './User/SellerButton';
import useLoadingAndError from '../hooks/useLoadingAndError';
import useFetchData from '@/hooks/useFetchData';
import PaginationControls from './Pagination/PaginationControls';

const Home = () => {
    const {
        data: products,
        loading,
        error,
        page,
        setPage,
        totalPages
    } = useFetchData(getProducts);

    const loadingErrorComponent = useLoadingAndError(loading, error);
    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <>
            <SellerButton />
            <ProductList products={products} />
            <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </>
    );
};

export default Home;
