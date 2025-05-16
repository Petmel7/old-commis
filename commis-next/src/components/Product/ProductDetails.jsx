
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFavorites } from '@/context/FavoritesContext';
import { getServerUrl } from '@/utils/env';
import Slider from 'react-slick';
import useProduct from '@/hooks/useProduct';
import BackButton from '../BackButton/BackButton';
import BuyButton from '../BuyButton/BuyButton';
// import ProductSize from './ProductSize';
import ProductSize from './productSize';
import FavoriteButton from '../Favorite/FavoriteButton';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/ProductDetails.module.css';

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                borderRadius: '50%',
                left: '10px',
                zIndex: 2
            }}
            onClick={onClick}
        />
    );
};

const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                borderRadius: '50%',
                right: '10px',
                zIndex: 2
            }}
            onClick={onClick}
        />
    );
};

const ProductDetails = () => {
    const router = useRouter();
    const { productId } = router.query;
    const { product, loading, error } = useProduct(productId);
    const loadingErrorComponent = useLoadingAndError(loading, error);
    const { favorites } = useFavorites();
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        const favorite = favorites.find(fav => fav.product_id === parseInt(productId));
        if (favorite) {
            setIsFavorite(true);
            setFavoriteId(favorite.id);
        } else {
            setIsFavorite(false);
            setFavoriteId(null);
        }
    }, [productId, favorites]);

    if (loadingErrorComponent) return loadingErrorComponent;

    if (!product) return <p>Продукт не знайдено</p>;

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    return (
        <>
            <BackButton />
            <div className={styles.productDetails}>
                <Slider {...settings} className={styles.slider}>
                    {product.images.map((image, index) => (
                        <div key={index} className={styles.imageContainer}>
                            <img className={styles.productImage} src={`${getServerUrl()}/${image}`} alt={product.name} />
                        </div>
                    ))}
                </Slider>
                <h1 className={styles.productName}>{product.name}</h1>
                <p className={styles.productDescription}>{product.description}</p>

                <div className={styles.priceContainer}>
                    <p className={styles.productPrice}>Ціна: {product.price} грн</p>
                    <FavoriteButton
                        product={product}
                        isFavorite={isFavorite}
                        favoriteId={favoriteId}
                    />
                </div>

                <ProductSize
                    productId={productId}
                    selectedSize={selectedSize}
                    handleSizeChange={handleSizeChange}
                />

                <BuyButton
                    product={product}
                    selectedSize={selectedSize}
                />
            </div>
        </>
    );
};

export default ProductDetails;

