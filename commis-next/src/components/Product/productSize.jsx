// import useProduct from "@/hooks/useProduct";

// const ProductSize = () => {
//     const { sizes } = useProduct(productId);

//     return (
//         { sizes && sizes.length > 0 && (
//             <div className={styles.sizeSelector}>
//                 <label htmlFor="size">Виберіть розмір:</label>
//                 <select id="size" value={selectedSize} onChange={handleSizeChange} required>
//                     <option value="" disabled>Оберіть розмір</option>
//                     {sizes.map((size, index) => (
//                         <option key={index} value={size.size}>{size.size}</option> // Виводимо доступні розміри
//                     ))}
//                 </select>
//             </div>
//         )}
//     )
// }

// export default ProductSize;