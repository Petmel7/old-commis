
import React, { useState, useEffect } from 'react';
import styles from './styles/ProductForm.module.css';

const ProductForm = ({ initialData = {}, onSubmit }) => {
    const [name, setName] = useState(initialData.name || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [price, setPrice] = useState(initialData.price || '');
    const [stock, setStock] = useState(initialData.stock || '');
    const [image, setImage] = useState(initialData.image || null);

    useEffect(() => {
        setName(initialData.name || '');
        setDescription(initialData.description || '');
        setPrice(initialData.price || '');
        setStock(initialData.stock || '');
        setImage(initialData.image || null);
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            name,
            description,
            price,
            stock,
            image
        };
        onSubmit(productData);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

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
                    onChange={handleImageChange}
                    required={!initialData.image}
                />
            </div>
            <button type="submit">{initialData.id ? 'Оновити' : 'Додати'} продукт</button>
        </form>
    );
};

export default ProductForm;
