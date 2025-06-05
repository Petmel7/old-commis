import { useRouter } from 'next/router';
import { deleteProduct } from '../../services/products';
import styles from './styles/DeleteProduct.module.css';

const DeleteProduct = ({ productId }) => {
    const router = useRouter();

    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        try {
            await deleteProduct(productId);
            router.push('/userProducts');
        } catch (error) {
            console.error('handleDeleteProduct->error', error);

            // ✅ Перевірка повідомлення від сервера
            if (error?.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('Сталася помилка під час видалення продукту.');
            }
        }
    };
    return (
        <button className={styles.deleteProduct} onClick={handleDeleteProduct}>Видалити</button>
    )
}

export default DeleteProduct;

