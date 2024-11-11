
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addProduct, updateProduct, getProductById } from '../../services/products';
import ProductForm from './ProductForm';
import BackButton from '../BackButton/BackButton';
import styles from './styles/ProductForm.module.css';

const AddOrUpdateProduct = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [initialData, setInitialData] = useState({});

    const fetchProduct = async () => {
        const productData = await getProductById(productId);
        setInitialData(productData);
    };

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleSubmit = async (productData) => {
        let response;
        if (productId) {
            response = await updateProduct(productId, productData);
        } else {
            response = await addProduct(productData);
        }
        router.push('/userProducts');
        return response;
    };

    return (
        <>
            <BackButton />
            <div className={styles.container}>
                <ProductForm initialData={initialData} fetchProduct={fetchProduct} onSubmit={handleSubmit} />
            </div>
        </>
    );

};

export default AddOrUpdateProduct;








// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { addProduct, updateProduct, getProductById } from '../../services/products';
// import ProductForm from './ProductForm';
// import BackButton from '../BackButton/BackButton';
// import styles from './styles/ProductForm.module.css';

// const AddOrUpdateProduct = () => {
//     const router = useRouter();
//     const { productId } = router.query;
//     const [initialData, setInitialData] = useState({});

//     const fetchProduct = async () => {
//         if (!productId) return;
//         const productData = await getProductById(productId);
//         setInitialData(productData);
//     };

//     useEffect(() => {
//         if (router.isReady) {
//             console.log("router.query:", router.query); // має показати productId
//             if (router.query.productId) {
//                 fetchProduct();
//             }
//         }
//     }, [router.isReady, router.query.productId]);

//     const handleSubmit = async (productData) => {
//         let response;
//         if (productId) {
//             response = await updateProduct(productId, productData);
//         } else {
//             response = await addProduct(productData);
//         }
//         router.push('/userProducts');
//         return response;
//     };

//     if (!router.isReady || !router.query.productId) {
//         return <p>Завантаження...</p>;
//     }

//     return (
//         <>
//             <BackButton />
//             <div className={styles.container}>
//                 <ProductForm initialData={initialData} fetchProduct={fetchProduct} onSubmit={handleSubmit} />
//             </div>
//         </>
//     );

// };

// export default AddOrUpdateProduct;



// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import ProductForm from './ProductForm';
// import { addProduct, updateProduct, getProductById } from '../../services/products';
// import BackButton from '../BackButton/BackButton';
// import styles from './styles/ProductForm.module.css';

// const AddOrUpdateProduct = () => {
//     const router = useRouter();
//     const { productId } = router.query;
//     const [initialData, setInitialData] = useState({});
//     const [loading, setLoading] = useState(true); // Додаємо стан завантаження

//     const fetchProduct = async () => {
//         if (productId) {
//             try {
//                 const productData = await getProductById(productId);
//                 setInitialData(productData);
//             } catch (error) {
//                 console.error('Помилка при завантаженні продукту:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchProduct();
//     }, [productId]);

//     const handleSubmit = async (productData) => {
//         let response;
//         if (productId) {
//             response = await updateProduct(productId, productData);
//         } else {
//             response = await addProduct(productData);
//         }
//         router.push('/userProducts');
//         return response;
//     };

//     if (loading) return <p>Завантаження...</p>;

//     return (
//         <>
//             <BackButton />
//             <div className={styles.container}>
//                 <ProductForm initialData={initialData} onSubmit={handleSubmit} />
//             </div>
//         </>
//     );
// };

// export default AddOrUpdateProduct;
