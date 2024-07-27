import React, { useState } from 'react';
import { addProducts } from '../../services/products';
import useLoadingAndError from '../../hooks/useLoadingAndError';
import styles from './styles/AddProduct.module.css';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProduct({
            ...product,
            image: file
        });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('stock', product.stock);

        if (product.image) {
            formData.append('image', product.image);
        }

        setLoading(true);
        setError(null);

        try {
            await addProducts(formData);
            console.log('Product submitted:', product);

            setProduct({
                name: '',
                description: '',
                price: '',
                stock: '',
                image: null
            });
            setImagePreview(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">Назва:</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="description">Опис:</label>
                    <textarea
                        className={styles.textarea}
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="price">Ціна:</label>
                    <input
                        className={styles.input}
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="stock">Кількість:</label>
                    <input
                        className={styles.input}
                        type="number"
                        id="stock"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="image">Фото:</label>
                    <input
                        className={styles.input}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} />
                    )}
                </div>
                <button className={styles.button} type="submit" disabled={loading}>Додати</button>
            </form>
        </div>
    );
};

export default AddProduct;

