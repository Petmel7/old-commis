
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductForm from './ProductForm';
import { addProduct, updateProduct, getProductById } from '../../services/products';
import styles from './styles/ProductForm.module.css';

const AddOrUpdateProduct = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [initialData, setInitialData] = useState({});

    const fetchProduct = async () => {
        const productData = await getProductById(productId);
        setInitialData(productData);
        console.log('fetchProduct->productData', productData);
    };

    useEffect(() => {
        if (productId) {

            fetchProduct();
        }
    }, [productId]);

    const handleSubmit = async (productData) => {
        if (productId) {
            await updateProduct(productId, productData);
            console.log('updateProduct->productData', productData);
        } else {
            await addProduct(productData);
            console.log('addProduct->productData', productData);
        }
        router.push('/userProducts');
    };

    return (
        <div className={styles.container}>
            <ProductForm initialData={initialData} fetchProduct={fetchProduct} onSubmit={handleSubmit} />
        </div>
    );
};

export default AddOrUpdateProduct;
