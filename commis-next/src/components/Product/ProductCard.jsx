
import Link from 'next/link';
import { baseUrl } from '../Url/baseUrl';
import { truncateText } from '@/utils/truncateText';
import BuyButton from '../BuyButton/BuyButton';
import HeartIcon from '../../../public/img/Heart.svg';
import styles from './styles/ProductCard.module.css';

const ProductCard = ({ product }) => {

    const firstImage = product.images && product.images.length > 0 ? product.images[0] : '';

    return (
        <div className={styles.productCard}>
            <HeartIcon />
            <Link href={`/products/details/${product.id}`}>
                <div className={styles.productCardImageContainer}>
                    <img className={styles.productCardImage} src={`${baseUrl}${firstImage}`} alt={product.name} />
                </div>
            </Link>
            <h2 className={styles.productCardName}>
                {truncateText(product.name, 15)}
            </h2>
            <p className={styles.productCardPrice}>Ціна:
                {product.price} грн
            </p>
            <BuyButton product={product} />
        </div>
    );
};

export default ProductCard;





// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { baseUrl } from '../Url/baseUrl';
// import axios from 'axios';
// import styles from './styles/ProductCard.module.css';

// const ProductCard = ({ product, userFavorites }) => {
//     const [isFavorite, setIsFavorite] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         // Перевірити, чи товар у списку вибраних
//         if (userFavorites.includes(product.id)) {
//             setIsFavorite(true);
//         }
//     }, [userFavorites]);

//     const handleFavoriteClick = async () => {
//         try {
//             if (isFavorite) {
//                 await axios.delete(`/api/favorites/${product.id}`);
//                 setIsFavorite(false);
//             } else {
//                 await axios.post('/api/favorites', { productId: product.id });
//                 setIsFavorite(true);
//             }
//         } catch (error) {
//             console.error('Помилка при оновленні статусу вибраного:', error);
//         }
//     };

//     return (
//         <div className={styles.productCard}>
//             <div className={styles.productCardImageContainer}>
//                 <img className={styles.productCardImage} src={`${baseUrl}${product.images[0]}`} alt={product.name} />
//             </div>
//             <h2 className={styles.productCardName}>{product.name}</h2>
//             <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>
//             <button
//                 className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
//                 onClick={handleFavoriteClick}
//             >
//                 ❤
//             </button>
//         </div>
//     );
// };

// export default ProductCard;
