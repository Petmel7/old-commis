
import { useState, useEffect } from 'react';
import { getServerUrl } from '@/utils/env';
import { addSizeToProduct, removeAllSizesFromProduct } from '@/services/sizes';
import DeleteImage from './DeleteImage';
import DeleteIcon from '../../../public/img/delete.svg';
import CategorySelect from '../Catalog/CategorySelect';
import styles from './styles/ProductForm.module.css';

import ConfirmEmailModal from '../User/ConfirmEmailModal';
import AddPhoneNumber from '../User/AddPhoneNumber';
import ConfirmPhoneModal from '../User/ConfirmPhoneModal';
import useUserStatus from '@/hooks/useUserStatus';

const LS_KEY = 'productFormData';

const ProductForm = ({ initialData = {}, onSubmit, fetchProduct }) => {
    const [name, setName] = useState(initialData.name || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [price, setPrice] = useState(initialData.price || '');
    const [stock, setStock] = useState(initialData.stock || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [subcategory, setSubcategory] = useState(initialData.subcategory || '');
    const [internationalSizes, setInternationalSizes] = useState([]);
    const [ukrainianSizes, setUkrainianSizes] = useState([]);
    const [shoeSizes, setShoeSizes] = useState([]);

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState(
        Array.isArray(initialData.images)
            ? initialData.images.map(image => image)
            : []
    );

    const {
        user,
        isEmailModalOpen,
        closeEmailModal,
        isAddPhoneModalOpen,
        closeAddPhoneModal,
        openConfirmPhoneModal,
        isConfirmPhoneModalOpen,
        closeConfirmPhoneModal,
    } = useUserStatus();

    const shoeSubcategories = ['Чоловіче взуття', 'Жіноче взуття', 'Дитяче взуття'];

    useEffect(() => {
        if (initialData.id) {
            // 🔄 Якщо редагуємо існуючий продукт
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setPrice(initialData.price || '');
            setStock(initialData.stock || '');
            if (initialData?.category?.name) {
                setCategory(initialData.category.name || '');
            }
            if (initialData?.subcategory?.name) {
                setSubcategory(initialData.subcategory.name || '');
            }

            if (initialData?.sizes?.length > 0) {
                const sizes = initialData.sizes.map(s => s.size);

                const shoeSizeOptions = ["38", "39", "40", "41", "42", "43", "44", "45"];
                const ukrainianSizeOptions = ["40", "42", "44", "46", "48", "50", "52", "54"];
                const internationalSizeOptions = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

                const shoe = sizes.filter(size => shoeSizeOptions.includes(size));
                const intl = sizes.filter(size => internationalSizeOptions.includes(size));
                const ua = sizes.filter(size => ukrainianSizeOptions.includes(size));

                setShoeSizes(shoe);
                setInternationalSizes(intl);
                setUkrainianSizes(ua);
            }

            // Показати зображення з бекенду
            setImagePreviews(Array.isArray(initialData.images) ? initialData.images : []);
        } else {
            // 💾 Якщо додаємо новий продукт і є дані в localStorage
            const savedFormData = localStorage.getItem(LS_KEY);
            if (savedFormData) {
                try {
                    const parsed = JSON.parse(savedFormData);
                    setName(parsed.name || '');
                    setDescription(parsed.description || '');
                    setPrice(parsed.price || '');
                    setStock(parsed.stock || '');
                    setCategory(parsed.category || '');
                    setSubcategory(parsed.subcategory || '');
                    setInternationalSizes(parsed.internationalSizes || []);
                    setUkrainianSizes(parsed.ukrainianSizes || []);
                    setShoeSizes(parsed.shoeSizes || []);
                    setImagePreviews(parsed.imagePreviews || []);
                } catch (e) {
                    console.error('Помилка парсингу localStorage:', e);
                }
            }
        }
    }, [initialData]);

    //****************

    useEffect(() => {
        if (initialData.id) return; // Не зберігати при редагуванні

        const formDataToSave = {
            name,
            description,
            price,
            stock,
            category,
            subcategory,
            internationalSizes,
            ukrainianSizes,
            shoeSizes,
            imagePreviews,
        };

        localStorage.setItem(LS_KEY, JSON.stringify(formDataToSave));
    }, [
        name,
        description,
        price,
        stock,
        category,
        subcategory,
        internationalSizes,
        ukrainianSizes,
        shoeSizes,
        imagePreviews,
        initialData.id
    ]);

    //****************

    const handleInternationalSizeChange = (e) => {
        const selectedSizes = Array.from(e.target.selectedOptions, option => option.value);
        setInternationalSizes(selectedSizes);
        setUkrainianSizes([]);
        setShoeSizes([]);
    };

    const handleUkrainianSizeChange = (e) => {
        const selectedSizes = Array.from(e.target.selectedOptions, option => option.value);
        setUkrainianSizes(selectedSizes);
        setInternationalSizes([]);
        setShoeSizes([]);
    };

    const handleShoeSizeChange = (e) => {
        const selectedSizes = Array.from(e.target.selectedOptions, option => option.value);
        setShoeSizes(selectedSizes);
        setInternationalSizes([]);
        setUkrainianSizes([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const uploadedUrls = [];

        if (images.length > 0) {
            for (const image of images) {
                const formData = new FormData();
                formData.append('image', image);

                const res = await fetch(`${getServerUrl()}/api/upload-image`, {
                    method: 'POST',
                    body: formData,
                });

                const { url } = await res.json();
                uploadedUrls.push(url);
            }
        }

        // 🔁 Об'єднуємо старі + нові зображення
        const cleanedImagePreviews = imagePreviews.filter(
            (img) => !img.startsWith('blob:')
        );

        const finalImages =
            images.length > 0
                ? [...cleanedImagePreviews, ...uploadedUrls]
                : cleanedImagePreviews;

        const productData = {
            name,
            description,
            price,
            stock,
            category,
            subcategory,
            images: finalImages,
        };

        let selectedSizes = [];
        if (shoeSubcategories.includes(subcategory)) {
            selectedSizes = shoeSizes;
        } else {
            selectedSizes = internationalSizes.length > 0 ? internationalSizes : ukrainianSizes;
        }

        if (selectedSizes.length === 0) {
            alert('Будь ласка, виберіть розміри.');
            return;
        }

        try {
            const response = await onSubmit(productData);

            if (response && response.product) {
                await removeAllSizesFromProduct(response.product.id);
                await addSizeToProduct(response.product.id, selectedSizes);
            }
            localStorage.removeItem(LS_KEY);
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...files]);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
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
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    subcategory={subcategory}
                    setSubcategory={setSubcategory}
                />
            </div>

            {shoeSubcategories.includes(subcategory) ? (
                <div className={styles.formGroup}>
                    <label>Розміри взуття:</label>
                    <select
                        className={styles.select}
                        multiple
                        value={shoeSizes}
                        onChange={handleShoeSizeChange}
                        required
                    >
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                    </select>
                </div>
            ) : (
                <>
                    <div className={styles.formGroup}>
                        <label>Міжнародний розмір:</label>
                        <select
                            className={styles.select}
                            multiple
                            value={internationalSizes}
                            onChange={handleInternationalSizeChange}
                            disabled={ukrainianSizes.length > 0}
                        >
                            <option value="XXS">XXS</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Український розмір:</label>
                        <select
                            className={styles.select}
                            multiple
                            value={ukrainianSizes}
                            onChange={handleUkrainianSizeChange}
                            disabled={internationalSizes.length > 0}
                        >
                            <option value="40">40</option>
                            <option value="42">42</option>
                            <option value="44">44</option>
                            <option value="46">46</option>
                            <option value="48">48</option>
                            <option value="50">50</option>
                            <option value="52">52</option>
                            <option value="54">54</option>
                        </select>
                    </div>
                </>
            )}

            <div className={styles.formGroup}>
                <input
                    id="fileUpload"
                    name="images"
                    className={styles.inputFile}
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    required={!initialData.images || initialData.images.length === 0}
                />
                <label htmlFor="fileUpload" className={styles.customUploadButton}>
                    Вибрати зображення
                </label>

                <ul className={styles.imagePreviewContainer}>
                    {imagePreviews.map((preview, index) => (
                        <li key={index}>
                            <div className={styles.imagesContainer}>
                                <img src={preview} alt="Image Preview" className={styles.imagePreview} />
                                {initialData.id ? (
                                    <DeleteImage productId={initialData.id} index={index} fetchProduct={fetchProduct} />
                                ) : (
                                    <button className={styles.deleteImageForm} type="button" onClick={() => handleRemoveImage(index)}>
                                        <DeleteIcon />
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <button type="submit">{initialData.id ? 'Редагувати' : 'Додати'}</button>

            {isEmailModalOpen && <ConfirmEmailModal show={isEmailModalOpen} onClose={closeEmailModal} email={user?.email} />}
            {isAddPhoneModalOpen && <AddPhoneNumber show={isAddPhoneModalOpen} onClose={closeAddPhoneModal} onPhoneAdded={openConfirmPhoneModal} />}
            {isConfirmPhoneModalOpen && <ConfirmPhoneModal show={isConfirmPhoneModalOpen} onClose={closeConfirmPhoneModal} />}
        </form>
    );
};

export default ProductForm;
