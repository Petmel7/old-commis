
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/admin";
import DeleteUser from "./DeleteUser";

const UserDetails = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [userById, setUserById] = useState(null);

    useEffect(() => {
        const fetchUserById = async () => {
            if (userId) {
                const userData = await getUserById(userId);
                setUserById(userData);
            }
        };
        fetchUserById();
    }, [userId]);

    const handleDeleteUser = () => {
        // Після видалення користувача повертаємося до списку
        router.push("/admin/users-management");
    };

    if (!userById) return <p>Завантаження...</p>;

    return (
        <div>
            <h3>Деталі користувача</h3>
            <p>Ім'я: {userById.name}</p>
            <p>Email: {userById.email}</p>
            <p>Роль: {userById.role}</p>
            <p>Дата створення: {userById.createdat}</p>
            <DeleteUser userId={userId} onDelete={handleDeleteUser} />
        </div>
    );
};

export default UserDetails;
