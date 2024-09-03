
import Link from "next/link";
import Menu from "../Menu/Menu";
import styles from './styles/ContentCatalog.module.css';

const ContentCatalog = ({ isOpen, handleCloseClick }) => {
    return (
        <Menu isOpen={isOpen} handleCloseClick={handleCloseClick}>
            <h3 className={styles.catalogHeading}>Каталог</h3>
            <ul className={styles.catalogList}>
                <li className={styles.catalogItem}>
                    <p className={styles.categoryTitle}>Одяг</p>
                    <ul className={styles.subCategoryList}>
                        <li className={styles.subCategoryItem}><Link href="">Чоловічий одяг</Link></li>
                        <li className={styles.subCategoryItem}><Link href="">Жіночий одяг</Link></li>
                        <li className={styles.subCategoryItem}><Link href="">Дитячий одяг</Link></li>
                    </ul>
                </li>
                <li className={styles.catalogItem}>
                    <p className={styles.categoryTitle}>Аксесуари</p>
                    <ul className={styles.subCategoryList}>
                        <li className={styles.subCategoryItem}><Link href="">Годинники</Link></li>
                        <li className={styles.subCategoryItem}><Link href="">Прикраси</Link></li>
                        <li className={styles.subCategoryItem}><Link href="">Сумки</Link></li>
                    </ul>
                </li>
                <li className={styles.catalogItem}>
                    <p className={styles.categoryTitle}>Сувеніри</p>
                    <ul className={styles.subCategoryList}>
                        <li className={styles.subCategoryItem}><Link href="">Магніти</Link></li>
                        <li className={styles.subCategoryItem}><Link href="">Брелоки</Link></li>
                        <li className={styles.subCategoryItem}><Link href="">Статуетки</Link></li>
                    </ul>
                </li>
                <li className={styles.catalogItem}>
                    <p className={styles.categoryTitle}>Канцелярія</p>
                    <ul className={styles.subCategoryList}>
                        <li className={styles.subCategoryItem}><Link href="">Ручки</Link></li>
                        <li className={styles.subCategoryItem}><Link href="">Блокноти</Link></li>
                        <li className={styles.subCategoryItem}><Link href="">Щоденники</Link></li>
                    </ul>
                </li>
                <li className={styles.catalogItem}>
                    <p className={styles.categoryTitle}>Весь каталог</p>
                    <ul className={styles.subCategoryList}>
                        <li className={styles.subCategoryItem}><Link href="">Усі товари</Link></li>
                    </ul>
                </li>
            </ul>
        </Menu>
    )
}

export default ContentCatalog;

