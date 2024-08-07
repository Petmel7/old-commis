
import { deleteImage } from '../../services/products';

const DeleteImage = ({ productId, index, fetchProduct }) => {

    const handleDeleteImage = async (e) => {
        e.preventDefault();
        const indices = [index];
        console.log('handleDeleteImage->indices', indices);
        try {
            await deleteImage(productId, indices);
            fetchProduct();
            console.log('DeleteImage->productId-indices', productId, indices);
        } catch (error) {
            console.log('handleDeleteImage->error', error);
        }
    }

    return (
        <button onClick={handleDeleteImage}>Delete</button>
    )
}

export default DeleteImage;