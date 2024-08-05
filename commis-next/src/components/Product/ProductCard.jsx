
// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { useCart } from '../../context/CartContext';
// import { baseUrl } from '../Url/baseUrl';
// import useLoadingAndError from '../../hooks/useLoadingAndError';
// import styles from './styles/ProductCard.module.css';

// const ProductCard = ({ product }) => {
//     const { addToCart } = useCart();
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const loadingErrorComponent = useLoadingAndError(loading, error);

//     const handleBuy = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             addToCart(product);
//             router.push('/cart');
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loadingErrorComponent) return loadingErrorComponent;

//     return (
//         <div className={styles.productCard}>
//             <Link href={`/products/details/${product.id}`}>
//                 <div className={styles.productCardImageContainer}>
//                     <img className={styles.productCardImage} src={`${baseUrl}${product.image}`} alt={product.name} />
//                 </div>
//             </Link>
//             <h2 className={styles.productCardName}>{product.name}</h2>
//             <p className={styles.productCardDescription}>{product.description}</p>
//             <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>
//             <button className={styles.productCardButton} onClick={handleBuy}>Купити</button>
//         </div>
//     );
// };

// export default ProductCard;






import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { baseUrl } from '../Url/baseUrl';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const handleBuy = async () => {
        setLoading(true);
        setError(null);

        try {
            addToCart(product);
            router.push('/cart');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    // Перевіряємо, чи є картинки та відображаємо першу картинку
    const firstImage = product.images && product.images.length > 0 ? product.images[0] : '';

    return (
        <div className={styles.productCard}>
            <Link href={`/products/details/${product.id}`}>
                <div className={styles.productCardImageContainer}>
                    <img className={styles.productCardImage} src={`${baseUrl}${firstImage}`} alt={product.name} />
                </div>
            </Link>
            <h2 className={styles.productCardName}>{product.name}</h2>
            <p className={styles.productCardDescription}>{product.description}</p>
            <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>
            <button className={styles.productCardButton} onClick={handleBuy}>Купити</button>
        </div>
    );
};

export default ProductCard;
