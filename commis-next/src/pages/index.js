
import React, { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import SellerButton from '../components/User/SellerButton';
import { getProducts } from '../services/products';
import useLoadingAndError from '../hooks/useLoadingAndError';

const HomePage = ({ isRegistered, isGoogleRegistered }) => {
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
            <SellerButton
                isRegistered={isRegistered}
                isGoogleRegistered={isGoogleRegistered}
            />
            <ProductList products={products} />
        </>
    );
};

export default HomePage;




