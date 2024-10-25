
import Link from "next/link";
import adminDataList from "./adminDatalList";
import styles from './styles/AdminOffice.module.css';

const AdminOffice = () => {
    return (
        <div className={styles.adminOfficeContainer}>
            <h3 className={styles.adminOfficeTitle}>Кабінет адміністратора</h3>
            <ul className={styles.adminDataList}>
                {adminDataList.map((item, index) => (
                    <li key={index}>
                        {console.log('$$$$AdminOffice', item.slug)}
                        <Link href={`/admin/slug/${item.slug}`}>
                            <p className={styles.link}>{item.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminOffice;

