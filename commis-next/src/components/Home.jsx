
// import { getProducts } from '../services/products';
// import { validateArray } from '@/utils/validation';
// import ProductList from './Product/ProductList';
// import SellerButton from './User/SellerButton';
// import useLoadingAndError from '../hooks/useLoadingAndError';
// import useFetchData from '@/hooks/useFetchData';

// const Home = () => {
//     const { data: rawProducts, loading, error } = useFetchData(getProducts);
//     const products = validateArray(rawProducts)

//     const loadingErrorComponent = useLoadingAndError(loading, error);

//     if (loadingErrorComponent) return loadingErrorComponent;

//     return (
//         <>
//             <SellerButton />
//             <ProductList products={products} />
//         </>
//     );
// };

// export default Home;



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
