
import React, { useEffect, useState } from 'react';
import { getUserProducts } from '../../services/products';
import ProductList from './ProductList';
import useLoadingAndError from '../../hooks/useLoadingAndError';

const UserProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const data = await getUserProducts(accessToken);
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <ProductList products={products} />
    );
};

export default UserProducts;

