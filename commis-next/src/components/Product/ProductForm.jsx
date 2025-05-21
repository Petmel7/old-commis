
// import { useState, useEffect } from 'react';
// import { getServerUrl } from '@/utils/env';
// import { addSizeToProduct } from '@/services/sizes';
// import DeleteImage from './DeleteImage';
// import DeleteIcon from '../../../public/img/delete.svg';
// import CategorySelect from '../Catalog/CategorySelect';
// import styles from './styles/ProductForm.module.css';

// const ProductForm = ({ initialData = {}, onSubmit, fetchProduct }) => {
//     const [name, setName] = useState(initialData.name || '');
//     const [description, setDescription] = useState(initialData.description || '');
//     const [price, setPrice] = useState(initialData.price || '');
//     const [stock, setStock] = useState(initialData.stock || '');
//     const [category, setCategory] = useState(initialData.category || '');
//     const [subcategory, setSubcategory] = useState(initialData.subcategory || '');
//     const [internationalSizes, setInternationalSizes] = useState([]);
//     const [ukrainianSizes, setUkrainianSizes] = useState([]);
//     const [shoeSizes, setShoeSizes] = useState([]);
//     const [images, setImages] = useState([]);
//     const [imagePreviews, setImagePreviews] = useState(initialData.images ? initialData.images.map(image => `${getServerUrl()}/${image}`) : []);

//     // Підкатегорії, які відповідають взуттю
//     const shoeSubcategories = ['Чоловіче взуття', 'Жіноче взуття', 'Дитяче взуття'];

//     useEffect(() => {
//         setName(initialData.name || '');
//         setDescription(initialData.description || '');
//         setPrice(initialData.price || '');
//         setStock(initialData.stock || '');
//         setCategory(initialData.category || '');
//         setSubcategory(initialData.subcategory || '');
//         setInternationalSizes([]);
//         setUkrainianSizes([]);
//         setShoeSizes([]);
//         setImagePreviews(initialData.images ? initialData.images.map(image => `${getServerUrl()}/${image}`) : []);
//     }, [initialData]);

//     // Оновлюємо міжнародні розміри і очищаємо українські та розміри взуття
//     const handleInternationalSizeChange = (e) => {
//         const selectedSizes = Array.from(e.target.selectedOptions, option => option.value);
//         setInternationalSizes(selectedSizes);
//         setUkrainianSizes([]);
//         setShoeSizes([]);
//     };

//     // Оновлюємо українські розміри і очищаємо міжнародні та розміри взуття
//     const handleUkrainianSizeChange = (e) => {
//         const selectedSizes = Array.from(e.target.selectedOptions, option => option.value);
//         setUkrainianSizes(selectedSizes);
//         setInternationalSizes([]);
//         setShoeSizes([]);
//     };

//     // Оновлюємо розміри взуття і очищаємо інші розміри
//     const handleShoeSizeChange = (e) => {
//         const selectedSizes = Array.from(e.target.selectedOptions, option => option.value);
//         setShoeSizes(selectedSizes);
//         setInternationalSizes([]);
//         setUkrainianSizes([]);
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();

//     //     const productData = new FormData();
//     //     productData.append('name', name);
//     //     productData.append('description', description);
//     //     productData.append('price', price);
//     //     productData.append('stock', stock);
//     //     productData.append('category', category);
//     //     productData.append('subcategory', subcategory);

//     //     // Додавання зображень
//     //     images.forEach((image, index) => {
//     //         productData.append('images', image);
//     //     });

//     //     // Вибір, які розміри будуть додані
//     //     let selectedSizes = [];
//     //     if (shoeSubcategories.includes(subcategory)) {
//     //         selectedSizes = shoeSizes;
//     //     } else {
//     //         selectedSizes = internationalSizes.length > 0 ? internationalSizes : ukrainianSizes;
//     //     }

//     //     if (selectedSizes.length === 0) {
//     //         alert('Будь ласка, виберіть розміри.');
//     //         return;
//     //     }

//     //     try {
//     //         const response = await onSubmit(productData);

//     //         if (response && response.product) {
//     //             // Додаємо обрані розміри до продукту
//     //             await addSizeToProduct(response.product.id, selectedSizes);
//     //         }
//     //     } catch (error) {
//     //         console.error('Error in handleSubmit:', error);
//     //     }
//     // };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Завантажити картинки на Supabase
//         const uploadedUrls = [];
//         for (const image of images) {
//             const formData = new FormData();
//             formData.append('image', image);

//             const res = await fetch(`${getServerUrl()}/api/upload-image`, {
//                 method: 'POST',
//                 body: formData,
//             });

//             const { url } = await res.json();
//             uploadedUrls.push(url);
//         }

//         const productData = {
//             name,
//             description,
//             price,
//             stock,
//             category,
//             subcategory,
//             images: uploadedUrls,
//         };

//         const response = await onSubmit(productData); // 👈 оце збереження продукту
//     };

//     let selectedSizes = [];
//     if (shoeSubcategories.includes(subcategory)) {
//         selectedSizes = shoeSizes;
//     } else {
//         selectedSizes = internationalSizes.length > 0 ? internationalSizes : ukrainianSizes;
//     }

//     if (selectedSizes.length === 0) {
//         alert('Будь ласка, виберіть розміри.');
//         return;
//     }

//     try {
//         const response = await onSubmit(productData);

//         if (response && response.product) {
//             await addSizeToProduct(response.product.id, selectedSizes);
//         }
//     } catch (error) {
//         console.error('Error in handleSubmit:', error);
//     }
// };

// const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(prevImages => [...prevImages, ...files]);
//     const previews = files.map(file => URL.createObjectURL(file));
//     setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
// };

// const handleRemoveImage = (index) => {
//     setImages(prevImages => prevImages.filter((_, i) => i !== index));
//     setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
// };

// return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//             <input
//                 className={styles.input}
//                 type="text"
//                 placeholder="Назва"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//         </div>
//         <div className={styles.formGroup}>
//             <textarea
//                 className={styles.textarea}
//                 placeholder="Опис"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//             />
//         </div>
//         <div className={styles.formGroup}>
//             <input
//                 className={styles.input}
//                 type="number"
//                 placeholder="Ціна"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 required
//             />
//         </div>
//         <div className={styles.formGroup}>
//             <input
//                 className={styles.input}
//                 type="number"
//                 placeholder="Кількість"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 required
//             />
//         </div>

//         {/* Поле для вибору категорії та підкатегорії */}
//         <div className={styles.formGroup}>
//             <CategorySelect
//                 category={category}
//                 setCategory={setCategory}
//                 subcategory={subcategory}
//                 setSubcategory={setSubcategory}
//             />
//         </div>

//         {/* Якщо підкатегорія — взуття, показуємо розміри для взуття */}
//         {shoeSubcategories.includes(subcategory) ? (
//             <div className={styles.formGroup}>
//                 <label>Розміри взуття:</label>
//                 <select
//                     className={styles.select}
//                     multiple
//                     value={shoeSizes}
//                     onChange={handleShoeSizeChange}
//                     required
//                 >
//                     <option value="38">38</option>
//                     <option value="39">39</option>
//                     <option value="40">40</option>
//                     <option value="41">41</option>
//                     <option value="42">42</option>
//                     <option value="43">43</option>
//                     <option value="44">44</option>
//                     <option value="45">45</option>
//                 </select>
//             </div>
//         ) : (
//             <>
//                 {/* Якщо підкатегорія не взуття, показуємо розміри для одягу */}
//                 <div className={styles.formGroup}>
//                     <label>Міжнародний розмір:</label>
//                     <select
//                         className={styles.select}
//                         multiple
//                         value={internationalSizes}
//                         onChange={handleInternationalSizeChange}
//                         disabled={ukrainianSizes.length > 0} // Блокуємо, якщо вибрано українські розміри
//                     >
//                         <option value="XXS">XXS</option>
//                         <option value="XS">XS</option>
//                         <option value="S">S</option>
//                         <option value="M">M</option>
//                         <option value="L">L</option>
//                         <option value="XL">XL</option>
//                         <option value="XXL">XXL</option>
//                     </select>
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label>Український розмір:</label>
//                     <select
//                         className={styles.select}
//                         multiple
//                         value={ukrainianSizes}
//                         onChange={handleUkrainianSizeChange}
//                         disabled={internationalSizes.length > 0} // Блокуємо, якщо вибрано міжнародні розміри
//                     >
//                         <option value="40">40</option>
//                         <option value="42">42</option>
//                         <option value="44">44</option>
//                         <option value="46">46</option>
//                         <option value="48">48</option>
//                         <option value="50">50</option>
//                         <option value="52">52</option>
//                         <option value="54">54</option>
//                     </select>
//                 </div>
//             </>
//         )}

//         <div className={styles.formGroup}>
//             <input
//                 id="fileUpload"
//                 className={styles.inputFile}
//                 type="file"
//                 multiple
//                 onChange={handleImageChange}
//                 required={!initialData.images || initialData.images.length === 0}
//             />
//             <label htmlFor="fileUpload" className={styles.customUploadButton}>
//                 Вибрати зображення
//             </label>

//             <ul className={styles.imagePreviewContainer}>
//                 {imagePreviews.map((preview, index) => (
//                     <li key={index}>
//                         <div className={styles.imagesContainer}>
//                             <img src={preview} alt="Image Preview" className={styles.imagePreview} />
//                             {initialData.id ? (
//                                 <DeleteImage productId={initialData.id} index={index} fetchProduct={fetchProduct} />
//                             ) : (
//                                 <button className={styles.deleteImageForm} type="button" onClick={() => handleRemoveImage(index)}>
//                                     <DeleteIcon />
//                                 </button>
//                             )}
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>

//         <button type="submit">{initialData.id ? 'Редагувати' : 'Додати'}</button>
//     </form>
// );
// };

// export default ProductForm;






import { useState, useEffect } from 'react';
import { getServerUrl } from '@/utils/env';
import { addSizeToProduct } from '@/services/sizes';
import DeleteImage from './DeleteImage';
import DeleteIcon from '../../../public/img/delete.svg';
import CategorySelect from '../Catalog/CategorySelect';
import styles from './styles/ProductForm.module.css';

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
    // const [imagePreviews, setImagePreviews] = useState(initialData.images ? initialData.images.map(image => `${getServerUrl()}/${image}`) : []);
    const [imagePreviews, setImagePreviews] = useState(
        Array.isArray(initialData.images)
            ? initialData.images.map(image => `${getServerUrl()}/${image}`)
            : []
    );

    const shoeSubcategories = ['Чоловіче взуття', 'Жіноче взуття', 'Дитяче взуття'];

    useEffect(() => {
        setName(initialData.name || '');
        setDescription(initialData.description || '');
        setPrice(initialData.price || '');
        setStock(initialData.stock || '');
        setCategory(initialData.category || '');
        setSubcategory(initialData.subcategory || '');
        setInternationalSizes([]);
        setUkrainianSizes([]);
        setShoeSizes([]);
        // setImagePreviews(initialData.images ? initialData.images.map(image => `${getServerUrl()}/${image}`) : []);
        setImagePreviews(
            Array.isArray(initialData.images)
                ? initialData.images.map(image => `${getServerUrl()}/${image}`)
                : []
        );
    }, [initialData]);

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

        const productData = {
            name,
            description,
            price,
            stock,
            category,
            subcategory,
            images: uploadedUrls,
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
                await addSizeToProduct(response.product.id, selectedSizes);
            }
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
        </form>
    );
};

export default ProductForm;
