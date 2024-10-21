
import useProduct from "@/hooks/useProduct";
import styles from './styles/ProductSize.module.css';

const ProductSize = ({ productId, selectedSize, handleSizeChange }) => {
    const { sizes } = useProduct(productId);

    return (
        <>
            {sizes && sizes.length > 0 && (
                <div className={styles.sizeSelector}>
                    <select id="size" value={selectedSize} onChange={handleSizeChange} required>
                        <option value="" disabled>Оберіть розмір</option>
                        {sizes.map((size, index) => (
                            <option key={index} value={size.size}>{size.size}</option>
                        ))}
                    </select>
                </div>
            )}
        </>
    )
}

export default ProductSize;