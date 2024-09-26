
// import styles from './styles/CategorySelect.module.css';
// import catalogDataSelect from './catalogDataSelect';

// const CategorySelect = ({ category, setCategory }) => {
//     return (
//         <select
//             className={styles.select}
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//         >
//             <option className={styles.categoryHeader} value="" disabled>
//                 Виберіть категорію
//             </option>

//             {catalogDataSelect.map((categoryGroup, index) => (
//                 <optgroup key={index} label={categoryGroup.title}>
//                     {categoryGroup.subcategories.map((subcategory, subIndex) => (
//                         <option key={subIndex} value={subcategory.value}>
//                             {subcategory.name}
//                         </option>
//                     ))}
//                 </optgroup>
//             ))}
//         </select>
//     );
// };

// export default CategorySelect;




import { useState, useEffect } from 'react';
import catalogDataSelect from './catalogDataSelect';
import styles from './styles/CategorySelect.module.css';

const CategorySelect = ({ category, setCategory, subcategory, setSubcategory }) => {
    const [subcategories, setSubcategories] = useState([]);

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
            {/* Селектор для категорії */}
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

            {/* Селектор для підкатегорії */}
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

