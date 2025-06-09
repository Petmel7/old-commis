
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addProduct, updateProduct, getProductById } from '../../services/products';
import { getSubcategoryById, getCategoryBySubcategoryId } from '@/services/catalog';
import { getSizesByProductId } from '@/services/sizes';
import { useAuth } from '@/context/AuthContext';
import useCheckUserBlocked from '@/hooks/useCheckUserBlocked';
import UserStatusText from '../UserStatusText/UserStatusText';
import ProductForm from './ProductForm';
import BackButton from '../BackButton/BackButton';
import styles from './styles/ProductForm.module.css';

const AddOrUpdateProduct = () => {
    useCheckUserBlocked();
    const { isBlocked } = useAuth();
    const router = useRouter();
    const { productId } = router.query;
    const [initialData, setInitialData] = useState({});

    const fetchProduct = async () => {
        try {
            const productData = await getProductById(productId);

            const [subcategory, category, sizes] = await Promise.all([
                getSubcategoryById(productData.subcategory_id),
                getCategoryBySubcategoryId(productData.subcategory_id),
                getSizesByProductId(productId),
            ]);

            const enrichedData = {
                ...productData,
                subcategory,
                category,
                sizes,
            };
            console.log('✅subcategory:', productData.subcategory);
            console.log('✅enrichedData', enrichedData);

            setInitialData(enrichedData);
        } catch (error) {
            console.error('fetchProduct error:', error);
        }
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

    if (isBlocked) return <UserStatusText />;

    return (
        <>
            <BackButton />
            <div className={styles.container}>
                <ProductForm
                    initialData={initialData}
                    fetchProduct={fetchProduct}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );

};

export default AddOrUpdateProduct;

