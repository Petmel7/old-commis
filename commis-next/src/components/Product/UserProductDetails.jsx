
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getServerUrl } from '@/utils/env';
import { useAuth } from '@/context/AuthContext';
import useProduct from '@/hooks/useProduct';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import DeleteProduct from './DeleteProduct';
import BackButton from '../BackButton/BackButton';
import Modal from '../Modal/Modal';
import useModal from '@/hooks/useModal';
import Slider from 'react-slick';
import BlockedButton from '../AdminOffice/BlockedButton';
import styles from './styles/UserProductDetails.module.css';

const UserProductDetails = () => {
    const router = useRouter();
    const { productId } = router.query;
    const { user } = useAuth();
    const { isModalOpen, openModal, closeModal } = useModal();
    const { product, setProduct, loading, error } = useProduct(productId);
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

    const productsArray = Array.isArray(product) ? product : [product];

    return (
        <div className={styles.productDetails}>
            <BackButton />
            {productsArray.map(product => (
                <div key={product.id} className={styles.productCard}>
                    <Slider {...settings} className={styles.slider}>
                        {Array.isArray(product.images) && product.images.map((image, index) => (
                            <div key={index} className={styles.imageContainer}>
                                <img className={styles.productImage} src={`${getServerUrl}/${image}`} alt={product.name} />
                            </div>
                        ))}
                    </Slider>

                    <h2 className={styles.productName}>{product.name}</h2>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>Ціна: {product.price} грн</p>

                    <div className={styles.userProductsContainer}>
                        <button className={styles.modalButtonOpen} onClick={openModal}>Видалити</button>
                        <Modal show={isModalOpen} onClose={closeModal}>
                            <div className={styles.modalContainer}>
                                <p className={styles.modalText}>Ви справді хочете видалити цей продукт?</p>
                                <DeleteProduct productId={product.id} />
                                <button className={styles.modalButtonClose} onClick={closeModal}>Скасувати</button>
                            </div>
                        </Modal>

                        <Link href={`/products/update/${product.id}`}>
                            <button className={styles.editButton}>Редагувати</button>
                        </Link>

                        {user.role === 'superadmin' &&
                            <BlockedButton
                                className={styles.blockedButton}
                                id={productId}
                                isBlocked={product.is_blocked}
                                onStatusChange={setProduct}
                                type='product'
                            />
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserProductDetails;

