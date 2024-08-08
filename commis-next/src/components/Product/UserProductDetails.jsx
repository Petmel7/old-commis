
import Link from 'next/link';
import { useRouter } from 'next/router';
import { baseUrl } from '../Url/baseUrl';
import useProduct from '@/hooks/useProduct';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import DeleteProduct from './DeleteProduct';
import Slider from 'react-slick';
import styles from './styles/UserProductDetails.module.css';

const UserProductDetails = () => {
    const router = useRouter();
    const { productId } = router.query;

    const { product, loading, error } = useProduct(productId);


    console.log('UserProductDetails->product', product);
    const loadingErrorComponent = useLoadingAndError(loading, error);

    if (loadingErrorComponent) return loadingErrorComponent;
    if (!product) return <p>Продукт не знайдено</p>;

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={styles.productDetails}>
            {[product].map(product => (
                <div key={product.id} className={styles.productCard}>
                    <Slider {...settings} className={styles.slider}>
                        {Array.isArray(product.images) && product.images.map((image, index) => (
                            <div key={index} className={styles.imageContainer}>
                                <img className={styles.productImage} src={`${baseUrl}${image}`} alt={product.name} />
                            </div>
                        ))}
                    </Slider>
                    <h2 className={styles.productName}>{product.name}</h2>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>Ціна: {product.price} грн</p>
                    <div className={styles.userProductsContainer}>
                        <DeleteProduct productId={product.id} />
                        <Link href={`/products/update/${product.id}`}>
                            <button className={styles.editButton}>Редагувати</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserProductDetails;