import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Для отримання параметрів з URL
import { getUsersByRole } from "@/services/admin"; // Ваш сервіс для отримання користувачів за роллю

const UsersByRole = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { role } = router.query; // Отримання ролі з URL

    useEffect(() => {
        if (role) {
            const fetchUsers = async () => {
                try {
                    const usersData = await getUsersByRole(role); // API запит для отримання користувачів за роллю
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
                    <li key={user.id}>
                        <p>{user.name} - {user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersByRole;