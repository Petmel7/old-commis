
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import { baseUrl } from '../Url/baseUrl';
import useProduct from '@/hooks/useProduct';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/ProductDetails.module.css';

const ProductDetails = () => {
    const router = useRouter();
    const { productId } = router.query;

    const { product, loading, error } = useProduct(productId);
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
            <Slider {...settings} className={styles.slider}>
                {product.images.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <img className={styles.productImage} src={`${baseUrl}${image}`} alt={product.name} />
                    </div>
                ))}
            </Slider>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Ціна: {product.price} грн</p>
        </div>
    );
};

export default ProductDetails;
