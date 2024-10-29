
import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserRoleCounts } from "@/services/admin";

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
        <>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <Link href={`/admin/${user.slug}`}>
                            <p>{user.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default UsersManagement;

