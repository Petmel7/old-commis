
// import Link from "next/link";
// import adminDataList from "./adminDatalList";

// const AdminOffice = () => {
//     return (
//         <div>
//             <h3>Кабінет адміністратора</h3>
//             <ul>
//                 {adminDataList.map((item, index) => (
//                     <li key={index}>
//                         <Link href={`/admin/${item.slug}`}>
//                             {item.title}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AdminOffice;



import Link from "next/link";
import adminDataList from "./adminDatalList";
import styles from './styles/AdminOffice.module.css'; // Підключення стилів

const AdminOffice = () => {
    return (
        <div className={styles.adminOfficeContainer}>
            <h3 className={styles.adminOfficeTitle}>Кабінет адміністратора</h3>
            <ul className={styles.adminDataList}>
                {adminDataList.map((item, index) => (
                    <li key={index}>
                        <Link href={`/admin/${item.slug}`}>
                            <p className={styles.link}>{item.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminOffice;

