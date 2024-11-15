import Link from 'next/link';
import { truncateText } from '@/utils/truncateText';
import styles from './styles/UserProducts.module.css';

const UserProductsCart = ({
    productId,
    productImages,
    productNames,
    productPrices,
    pathProductId }) => {

    return (
        <li key={productId} className={styles.productItem}>
            <div className={styles.productCard}>
                <Link href={pathProductId}>
                    <div className={styles.imageContainer}>
                        <img
                            className={styles.productImage}
                            src={productImages}
                            alt={productNames}
                        />
                    </div>
                </Link>
                <h2 className={styles.productName}>
                    {truncateText(productNames, 15)}
                </h2>
                <p className={styles.productPrice}>
                    Ціна: {productPrices} грн
                </p>
            </div>
        </li>
    )
}

export default UserProductsCart;