import { useState, useEffect } from "react";
import { getProductById } from '../services/products';

const useProduct = (productId) => {
    console.log('useProduct->productId', productId);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (productId) {
            const fetchProductById = async () => {
                try {
                    const productData = await getProductById(productId);
                    setProduct(productData);
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };

            fetchProductById();
        }
    }, [productId]);

    return { product, loading, error };
}

export default useProduct;
