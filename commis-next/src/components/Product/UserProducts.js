
import React, { useEffect, useState } from 'react';
import { getUserProducts } from '../../services/products';
import ProductList from './ProductList';
// import styles from './styles/UserProducts.module.css';

const UserProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ProductList products={products} />
    );
};

export default UserProducts;

