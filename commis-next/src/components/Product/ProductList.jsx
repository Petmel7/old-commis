
// import React, { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import styles from './styles/ProductCard.module.css';
// import { fetchFavorites } from '@/utils/fetchFavorites';

// const ProductList = ({ products }) => {
//     const [favorites, setFavorites] = useState([]);

//     useEffect(() => {
//         const loadFavorites = async () => {
//             const response = await fetchFavorites();
//             setFavorites(response);
//         };

//         loadFavorites();
//     }, []);

//     console.log('ProductList->favorites', favorites);

//     const isProductFavorite = (productId) => {
//         const favorite = favorites && favorites.find(fav => {
//             console.log('ProductList->isProductFavorite->fav', fav);
//             return fav.product_id === productId;
//         });

//         console.log('ProductList->isProductFavorite->favorite', favorite);

//         if (favorite) {
//             console.log('ProductList->isProductFavorite->favorite found', favorite);
//             return { isFavorite: true, favoriteId: favorite.id };
//         } else {
//             console.log('ProductList->isProductFavorite->favorite not found for productId', productId);
//             return { isFavorite: false, favoriteId: null };
//         }
//     };

//     return (
//         <ul className={styles.productList}>
//             {products.map(product => {
//                 const { isFavorite, favoriteId } = isProductFavorite(product.id);
//                 return (
//                     <li className={styles.productChildren} key={product.id}>
//                         <ProductCard
//                             product={product}
//                             isFavorite={isFavorite}
//                             favoriteId={favoriteId}
//                         />
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// };

// export default ProductList;




import React from 'react';
import ProductCard from './ProductCard';
import styles from './styles/ProductCard.module.css';
import { useFavorites } from '@/context/FavoritesContext';

const ProductList = ({ products }) => {
    const { favorites } = useFavorites();

    const isProductFavorite = (productId) => {
        const favorite = favorites.find(fav => fav.product_id === productId);
        return favorite ? { isFavorite: true, favoriteId: favorite.id } : { isFavorite: false, favoriteId: null };
    };

    return (
        <ul className={styles.productList}>
            {products.map(product => {
                const { isFavorite, favoriteId } = isProductFavorite(product.id);
                return (
                    <li className={styles.productChildren} key={product.id}>
                        <ProductCard
                            product={product}
                            isFavorite={isFavorite}
                            favoriteId={favoriteId}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default ProductList;


