
import Link from 'next/link';
import { getServerUrl } from '@/utils/env';
import { truncateText } from '@/utils/truncateText';
import FavoriteButton from '../Favorite/FavoriteButton';
import styles from './styles/ProductCard.module.css';

const ProductCard = ({ product, isFavorite = false, favoriteId = null }) => {
    console.log('product', product);
    const firstImage = product.images && product.images.length > 0 ? product.images[0] : '';

    return (
        <li className={styles.productChildren} key={product.id} >
            <div className={styles.productCard}>
                <Link href={`/products/details/${product.id}`}>
                    <div className={styles.productCardImageContainer}>
                        {console.log('${getServerUrl()}/${firstImage}', `${getServerUrl()}/${firstImage}`)}
                        <img className={styles.productCardImage} src={`${getServerUrl()}/${firstImage}`} alt={product.name} />
                    </div>
                </Link>
                <h2 className={styles.productCardName}>
                    {truncateText(product.name, 15)}
                </h2>
                <div className={styles.productContainer}>
                    <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>

                    <FavoriteButton
                        product={product}
                        isFavorite={isFavorite}
                        favoriteId={favoriteId}
                    />
                </div>
            </div>
        </li>
    );
};

export default ProductCard;
