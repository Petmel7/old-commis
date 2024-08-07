
import React, { useState, useEffect } from 'react';
import { baseUrl } from '../Url/baseUrl';
import DeleteImage from './DeleteImage';
import styles from './styles/ProductForm.module.css';

const ProductForm = ({ initialData = {}, onSubmit, fetchProduct }) => {
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
            productData.append(`images`, image);
        });

        // Log the contents of formData for debugging
        for (const [key, value] of productData.entries()) {
            console.log(`${key}:`, value);
        }

        onSubmit(productData);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    };

    console.log('ProductForm->imagePreviews', imagePreviews);

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
                <ul className={styles.imagePreviewContainer}>
                    {imagePreviews.map((preview, index) => (
                        <li key={index}>
                            <img src={preview} alt="Image Preview" className={styles.imagePreview} />
                            {initialData.id ? (
                                <DeleteImage productId={initialData.id} index={index} fetchProduct={fetchProduct} />
                            ) : (
                                <button type="button" onClick={() => handleRemoveImage(index)}>Видалити</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <button type="submit">{initialData.id ? 'Оновити' : 'Додати'} продукт</button>
        </form >
    );
};

export default ProductForm;
