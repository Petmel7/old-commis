
import { useState } from 'react';
import { useRouter } from 'next/router';
import { baseUrl } from '../Url/baseUrl';
import Slider from 'react-slick';
import useProduct from '@/hooks/useProduct';
import BackButton from '../BackButton/BackButton';
import BuyButton from '../BuyButton/BuyButton';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/ProductDetails.module.css';

const ProductDetails = () => {
    const router = useRouter();
    const { productId } = router.query;

    const { product, sizes, loading, error } = useProduct(productId); // Додаємо sizes з useProduct
    const loadingErrorComponent = useLoadingAndError(loading, error);

    const [selectedSize, setSelectedSize] = useState(''); // Додаємо стан для вибору розміру

    if (loadingErrorComponent) return loadingErrorComponent;

    if (!product) return <p>Продукт не знайдено</p>;

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value); // Оновлюємо вибраний розмір
    };

    return (
        <>
            <BackButton />
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

                {/* Вибір розміру */}
                {sizes && sizes.length > 0 && (
                    <div className={styles.sizeSelector}>
                        <label htmlFor="size">Виберіть розмір:</label>
                        <select id="size" value={selectedSize} onChange={handleSizeChange} required>
                            <option value="" disabled>Оберіть розмір</option>
                            {sizes.map((size, index) => (
                                <option key={index} value={size.size}>{size.size}</option> // Виводимо доступні розміри
                            ))}
                        </select>
                    </div>
                )}

                {/* Кнопка "Купити", з передачею вибраного розміру */}
                <BuyButton product={product} selectedSize={selectedSize} />
            </div>
        </>
    );
};

export default ProductDetails;

