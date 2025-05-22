
import { useState, useEffect } from 'react';
import catalogDataSelect from './catalogDataSelect';
import styles from './styles/CategorySelect.module.css';

const CategorySelect = ({ category, setCategory, subcategory, setSubcategory }) => {
    const [subcategories, setSubcategories] = useState([]);
    console.log('category', category);
    console.log('subcategory', subcategory);
    useEffect(() => {
        if (category) {
            const selectedCategory = catalogDataSelect.find(cat => cat.title === category);
            setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
        } else {
            setSubcategories([]);
        }
    }, [category]);

    return (
        <div>
            <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="" disabled>Виберіть категорію</option>
                {catalogDataSelect.map((categoryGroup, index) => (
                    <option key={index} value={categoryGroup.title}>
                        {categoryGroup.title}
                    </option>
                ))}
            </select>

            {subcategories.length > 0 && (
                <select
                    className={styles.select}
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Виберіть підкатегорію</option>
                    {subcategories.map((subcategory, index) => (
                        <option key={index} value={subcategory.value}>
                            {subcategory.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default CategorySelect;

