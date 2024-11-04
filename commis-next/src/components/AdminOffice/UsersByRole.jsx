import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUsersByRole } from "@/services/admin";
import Link from "next/link";
import useLoadingAndError from "@/hooks/useLoadingAndError";

const UsersByRole = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { role } = router.query;
    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        if (role) {
            const fetchUsers = async () => {
                try {
                    const usersData = await getUsersByRole(role);
                    setUsers(usersData);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        }
    }, [role]);

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div>
            <h3>{role === 'buyer' ? 'Покупці' : role === 'seller' ? 'Продавці' : 'Користувачі'}</h3>
            <ul>
                {users.map((user) => (
                    <Link key={user.id} href={`/admin/user-details/${user.id}`}>
                        <li>
                            <p>{user.name}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default UsersByRole;
