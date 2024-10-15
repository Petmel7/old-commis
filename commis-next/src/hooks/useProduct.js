// import { useState, useEffect } from "react";
// import { getProductById } from '../services/products';
// import { getSizesByProductId } from "@/services/sizes";

// const useProduct = (productId) => {
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (productId) {
//             const fetchProductById = async () => {
//                 try {
//                     const productData = await getProductById(productId);
//                     setProduct(productData);
//                     setLoading(false);
//                 } catch (error) {
//                     setError(error.message);
//                     setLoading(false);
//                 }
//             };

//             fetchProductById();
//         }
//     }, [productId]);

//     return { product, loading, error };
// }

// export default useProduct;




import { useState, useEffect } from "react";
import { getProductById } from '../services/products';
import { getSizesByProductId } from "@/services/sizes"; // Імпортуємо функцію для отримання розмірів

const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([]); // Додаємо стан для розмірів
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (productId) {
            const fetchProductById = async () => {
                try {
                    // Отримуємо продукт
                    const productData = await getProductById(productId);
                    setProduct(productData);

                    // Отримуємо розміри продукту
                    const sizesData = await getSizesByProductId(productId);
                    setSizes(sizesData); // Зберігаємо розміри

                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };

            fetchProductById();
        }
    }, [productId]);

    return { product, sizes, loading, error }; // Повертаємо також і розміри
};

export default useProduct;

