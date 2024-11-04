
import { useState, useEffect } from "react";
import { getProductById } from '../services/products';
import { getSizesByProductId } from "@/services/sizes";

const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (productId) {
            const fetchProductById = async () => {
                try {
                    const productData = await getProductById(productId);
                    setProduct(productData);

                    const sizesData = await getSizesByProductId(productId);
                    setSizes(sizesData);

                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };

            fetchProductById();
        }
    }, [productId]);

    return { product, sizes, loading, error };
};

export default useProduct;

