import { deleteProduct } from '../../services/products';

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
        <button onClick={handleDeleteProduct}>Видалити</button>
    )
}

export default DeleteProduct;