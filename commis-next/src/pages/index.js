// import React, { useEffect, useState } from 'react';
// import ProductList from '../components/Product/ProductList';
// import AddPhoneNumber from '../components/User/AddPhoneNumber';
// import { getProducts } from '../services/products';

// const HomePage = ({ isAuthenticated }) => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const data = await getProducts();
//                 setProducts(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <>
//             <AddPhoneNumber isAuthenticated={isAuthenticated} />
//             <ProductList products={products} />
//         </>
//     );
// };

// export default HomePage;


import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import Login from '@/components/User/Login';
import { getProducts } from '../services/products';

const HomePage = ({ isAuthenticated, onLogin }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
                router.push('/');
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    console.log('HomePage->isAuthenticated', isAuthenticated); // Додайте лог для перевірки

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Login openModal={openModal} />
            <ProductList products={products} />
        </>
    );
};

export default HomePage;
