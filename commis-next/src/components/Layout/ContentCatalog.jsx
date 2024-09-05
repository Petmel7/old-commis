
import Link from "next/link";
import Menu from "../Menu/Menu";
import styles from './styles/ContentCatalog.module.css';

const catalogData = [
    {
        title: "Одяг",
        subcategories: [
            { name: "Чоловічий одяг", href: "/catalog?category=Чоловічий одяг" },
            { name: "Жіночий одяг", href: "/catalog?category=Жіночий одяг" },
            { name: "Дитячий одяг", href: "/catalog?category=Дитячий одяг" },
        ],
    },
    {
        title: "Аксесуари",
        subcategories: [
            { name: "Годинники", href: "/catalog?category=Годинники" },
            { name: "Прикраси", href: "/catalog?category=Прикраси" },
            { name: "Сумки", href: "/catalog?category=Сумки" },
        ],
    },
    {
        title: "Сувеніри",
        subcategories: [
            { name: "Магніти", href: "/catalog?category=Магніти" },
            { name: "Брелоки", href: "/catalog?category=Брелоки" },
            { name: "Статуетки", href: "/catalog?category=Статуетки" },
        ],
    },
    {
        title: "Канцелярія",
        subcategories: [
            { name: "Ручки", href: "/catalog?category=Ручки" },
            { name: "Блокноти", href: "/catalog?category=Блокноти" },
            { name: "Щоденники", href: "/catalog?category=Щоденники" },
        ],
    },
    {
        title: "Весь каталог",
        subcategories: [
            { name: "Усі товари", href: "/catalog" },
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
                                    <Link href={subcategory.href}>
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

