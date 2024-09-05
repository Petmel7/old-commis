// import { useState } from 'react';
import styles from './styles/CategorySelect.module.css';
import catalogData from './catalogData';

const CategorySelect = ({ category, setCategory }) => {
    return (
        <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
        >
            <option className={styles.categoryHeader} value="" disabled>
                Виберіть категорію
            </option>

            {catalogData.map((categoryGroup, index) => (
                <optgroup key={index} label={categoryGroup.title}>
                    {categoryGroup.subcategories.map((subcategory, subIndex) => (
                        <option key={subIndex} value={subcategory.value}>
                            {subcategory.name}
                        </option>
                    ))}
                </optgroup>
            ))}
        </select>
    );
};

export default CategorySelect;
