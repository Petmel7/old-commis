// import React, { useState, useEffect } from 'react';
// import ProductForm from './ProductForm';
// import { addProduct, updateProduct, getProductById } from '../../services/products';
// import styles from './styles/ProductForm.module.css';

// const AddOrUpdateProduct = ({ productId }) => {
//     const [initialData, setInitialData] = useState({});

//     useEffect(() => {
//         if (productId) {
//             const fetchProduct = async () => {
//                 const productData = await getProductById(productId);
//                 setInitialData(productData);
//             };
//             fetchProduct();
//         }
//     }, [productId]);

//     const handleSubmit = async (productData) => {
//         if (productId) {
//             await updateProduct(productId, productData);
//         } else {
//             await addProduct(productData);
//         }
//     };

//     return (
//         <div className={styles.container}>
//             {/* <h3>{productId ? 'Оновити' : 'Додати'} продукт</h3> */}
//             <ProductForm initialData={initialData} onSubmit={handleSubmit} />
//         </div>
//     );
// };

// export default AddOrUpdateProduct;



import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductForm from './ProductForm';
import { addProduct, updateProduct, getProductById } from '../../services/products';
import styles from './styles/ProductForm.module.css';

const AddOrUpdateProduct = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                const productData = await getProductById(productId);
                setInitialData(productData);
                console.log('fetchProduct->productData', productData);
            };
            fetchProduct();
        }
    }, [productId]);

    const handleSubmit = async (productData) => {
        if (productId) {
            await updateProduct(productId, productData);
            console.log('updateProduct->productData', productData);
        } else {
            await addProduct(productData);
        }
        router.push('/userProducts'); // Повернення до списку продуктів після збереження
    };

    return (
        <div className={styles.container}>
            {/* <h3>{productId ? 'Оновити' : 'Додати'} продукт</h3> */}
            <ProductForm initialData={initialData} onSubmit={handleSubmit} />
        </div>
    );
};

export default AddOrUpdateProduct;

