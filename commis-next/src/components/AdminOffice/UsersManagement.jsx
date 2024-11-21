
import Link from "next/link";
import styles from "./styles/UsersManagement.module.css";
import useFetchData from "@/hooks/useFetchData";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import { getUserRoleCounts } from "@/services/admin";

const UsersManagement = () => {
    const { data: users, loading, error } = useFetchData(getUserRoleCounts);
    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

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


