import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUsersByRole } from "@/services/admin";
import Link from "next/link";

const UsersByRole = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { role } = router.query;

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

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;

    return (
        <div>
            <h3>{role === 'buyer' ? 'Покупці' : role === 'seller' ? 'Продавці' : 'Користувачі'}</h3>
            <ul>
                {users.map((user) => (
                    <Link href={`/admin/user-details/${user.id}`}>
                        <li key={user.id}>
                            <p>{user.name}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default UsersByRole;
