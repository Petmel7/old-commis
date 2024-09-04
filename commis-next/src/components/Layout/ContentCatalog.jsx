import Link from "next/link";
import Menu from "../Menu/Menu";
import styles from './styles/ContentCatalog.module.css';

const catalogData = [
    {
        title: "Одяг",
        subcategories: [
            { name: "Чоловічий одяг", href: "/clothing/men" },
            { name: "Жіночий одяг", href: "/clothing/women" },
            { name: "Дитячий одяг", href: "/clothing/kids" },
        ],
    },
    {
        title: "Аксесуари",
        subcategories: [
            { name: "Годинники", href: "/accessories/watches" },
            { name: "Прикраси", href: "/accessories/jewelry" },
            { name: "Сумки", href: "/accessories/bags" },
        ],
    },
    {
        title: "Сувеніри",
        subcategories: [
            { name: "Магніти", href: "/souvenirs/magnets" },
            { name: "Брелоки", href: "/souvenirs/keychains" },
            { name: "Статуетки", href: "/souvenirs/figurines" },
        ],
    },
    {
        title: "Канцелярія",
        subcategories: [
            { name: "Ручки", href: "/stationery/pens" },
            { name: "Блокноти", href: "/stationery/notebooks" },
            { name: "Щоденники", href: "/stationery/diaries" },
        ],
    },
    {
        title: "Весь каталог",
        subcategories: [
            { name: "Усі товари", href: "/all-products" },
        ],
    },
];

const ContentCatalog = ({ isOpen, handleCloseClick }) => {
    return (
        <Menu isOpen={isOpen} handleCloseClick={handleCloseClick}>
            <h3 className={styles.catalogHeading}>Каталог</h3>
            <ul className={styles.catalogList}>
                {catalogData.map((category, index) => (
                    <li key={index} className={styles.catalogItem}>
                        <p className={styles.categoryTitle}>{category.title}</p>
                        <ul className={styles.subCategoryList}>
                            {category.subcategories.map((subcategory, subIndex) => (
                                <li key={subIndex} className={styles.subCategoryItem}>
                                    <Link href={subcategory.href}>{subcategory.name}</Link>
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
