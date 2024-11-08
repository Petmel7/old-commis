
import Link from "next/link";
import useFetchUsers from "@/hooks/useFetchUsers";
import styles from "./styles/UsersManagement.module.css";

const UsersManagement = () => {
    const { users, loadingErrorComponent } = useFetchUsers();

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <ul className={styles.usersList}>
            {users.map((user, index) => (
                <li key={index} className={styles.userItem}>
                    <Link href={`/admin/${user.slug}`} className={styles.userLink}>
                        <p>{user.title}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default UsersManagement;


