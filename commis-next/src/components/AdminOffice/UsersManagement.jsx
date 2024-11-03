
import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserRoleCounts } from "@/services/admin";
import styles from "./styles/UsersManagement.module.css";

const UsersManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersForManagement = async () => {
            const usersManagement = await getUserRoleCounts();
            setUsers(usersManagement);
        };
        fetchUsersForManagement();
    }, []);

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


