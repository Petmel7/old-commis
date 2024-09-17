import Link from "next/link";
import Menu from "../Menu/Menu";
import styles from './styles/ContentCatalog.module.css';
import catalogDataSelect from './catalogDataSelect';

const ContentCatalog = ({ isOpen, handleCloseClick }) => {
    return (
        <Menu isOpen={isOpen} handleCloseClick={handleCloseClick}>
            <h3 className={styles.catalogHeading}>Каталог</h3>
            <ul className={styles.catalogList}>
                {catalogDataSelect.map((category, index) => (
                    <li key={index} className={styles.catalogItem}>
                        <p className={styles.categoryTitle}>{category.title}</p>
                        <ul className={styles.subCategoryList}>
                            {category.subcategories.map((subcategory, subIndex) => (
                                <li key={subIndex} className={styles.subCategoryItem} onClick={handleCloseClick}>
                                    <Link href={`/catalog?category=${encodeURIComponent(subcategory.name)}`}>
                                        {subcategory.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </Menu>
    );
}

export default ContentCatalog;
