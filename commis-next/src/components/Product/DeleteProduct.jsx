import { deleteProduct } from '../../services/products';
import styles from './styles/DeleteProduct.module.css';

const DeleteProduct = ({ productId, fetchProducts }) => {

    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        try {
            await deleteProduct(productId);
            fetchProducts();
        } catch (error) {
            console.log('handleDeleteProduct->error', error);
        }
    }
    return (
        <button className={styles.deleteProduct} onClick={handleDeleteProduct}>Видалити</button>
    )
}

export default DeleteProduct;