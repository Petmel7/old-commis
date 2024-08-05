
// import React, { useState, useEffect } from 'react';
// import { baseUrl } from '../Url/baseUrl';
// import styles from './styles/ProductForm.module.css';

// const ProductForm = ({ initialData = {}, onSubmit }) => {
//     const [name, setName] = useState(initialData.name || '');
//     const [description, setDescription] = useState(initialData.description || '');
//     const [price, setPrice] = useState(initialData.price || '');
//     const [stock, setStock] = useState(initialData.stock || '');
//     const [image, setImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState(initialData.image ? `${baseUrl}${initialData.image}` : '');

//     useEffect(() => {
//         setName(initialData.name || '');
//         setDescription(initialData.description || '');
//         setPrice(initialData.price || '');
//         setStock(initialData.stock || '');
//         setImagePreview(initialData.image ? `${baseUrl}${initialData.image}` : '');
//     }, [initialData, baseUrl]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const productData = new FormData();
//         productData.append('name', name);
//         productData.append('description', description);
//         productData.append('price', price);
//         productData.append('stock', stock);
//         if (image) {
//             productData.append('image', image);
//         }
//         onSubmit(productData);
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//         setImagePreview(URL.createObjectURL(file));
//     };

//     return (
//         <form className={styles.form} onSubmit={handleSubmit}>
//             <div className={styles.formGroup}>
//                 <input
//                     className={styles.input}
//                     type="text"
//                     placeholder="Назва"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className={styles.formGroup}>
//                 <textarea
//                     className={styles.textarea}
//                     placeholder="Опис"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className={styles.formGroup}>
//                 <input
//                     className={styles.input}
//                     type="number"
//                     placeholder="Ціна"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className={styles.formGroup}>
//                 <input
//                     className={styles.input}
//                     type="number"
//                     placeholder="Кількість"
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className={styles.formGroup}>
//                 <input
//                     className={styles.input}
//                     type="file"
//                     onChange={handleImageChange}
//                     required={!initialData.image}
//                 />
//                 {imagePreview && (
//                     <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} />
//                 )}
//             </div>
//             <button type="submit">{initialData.id ? 'Оновити' : 'Додати'} продукт</button>
//         </form>
//     );
// };

// export default ProductForm;





import React, { useState, useEffect } from 'react';
import { baseUrl } from '../Url/baseUrl';
import styles from './styles/ProductForm.module.css';

const ProductForm = ({ initialData = {}, onSubmit }) => {
    const [name, setName] = useState(initialData.name || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [price, setPrice] = useState(initialData.price || '');
    const [stock, setStock] = useState(initialData.stock || '');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState(initialData.images ? initialData.images.map(image => `${baseUrl}${image}`) : []);

    useEffect(() => {
        setName(initialData.name || '');
        setDescription(initialData.description || '');
        setPrice(initialData.price || '');
        setStock(initialData.stock || '');
        setImagePreviews(initialData.images ? initialData.images.map(image => `${baseUrl}${image}`) : []);
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append('name', name);
        productData.append('description', description);
        productData.append('price', price);
        productData.append('stock', stock);
        images.forEach((image, index) => {
            productData.append(`images[${index}]`, image);
        });
        onSubmit(productData);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    console.log('imagePreviews', imagePreviews);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Назва"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <textarea
                    className={styles.textarea}
                    placeholder="Опис"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <input
                    className={styles.input}
                    type="number"
                    placeholder="Ціна"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <input
                    className={styles.input}
                    type="number"
                    placeholder="Кількість"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <input
                    className={styles.input}
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    required={!initialData.images || initialData.images.length === 0}
                />
                <div className={styles.imagePreviewContainer}>
                    {imagePreviews.map((preview, index) => (
                        <img key={index} src={preview} alt="Image Preview" className={styles.imagePreview} />
                    ))}
                </div>
            </div>
            <button type="submit">{initialData.id ? 'Оновити' : 'Додати'} продукт</button>
        </form>
    );
};

export default ProductForm;


