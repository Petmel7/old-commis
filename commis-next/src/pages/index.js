
import React, { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import SellerButton from '../components/User/SellerButton';
import { getProducts } from '../services/products';
import Loading from '../components/Loading/Loading';

const HomePage = ({ isRegistered, isGoogleRegistered }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();

    }, []);

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;

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
