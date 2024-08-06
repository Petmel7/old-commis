
import { deleteImage } from '../../services/products';

const DeleteImage = ({ productId, index }) => {

    const handleDeleteImage = async (e) => {
        e.preventDefault();
        try {
            await deleteImage(productId, index);
            console.log('DeleteImage->productId-index', productId, index);
        } catch (error) {
            console.log('handleDeleteImage->error', error);
        }
    }

    return (
        <button onClick={handleDeleteImage}>Delete</button>
    )
}

export default DeleteImage;