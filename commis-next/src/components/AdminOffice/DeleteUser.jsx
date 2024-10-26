
import { deleteUser } from "@/services/admin";

const DeleteUser = ({ userId, onDelete }) => {
    const handleDeleteUser = async () => {
        const isConfirmed = confirm("Ви впевнені, що хочете видалити цього користувача?");
        if (!isConfirmed) return;

        try {
            const response = await deleteUser(userId);

            console.log("Користувача успішно видалено");
            if (onDelete) onDelete(); // Викликаємо callback для повернення на список користувачів
        } catch (error) {
            console.error("handleDeleteUser->error", error);
        }
    };

    return <button onClick={handleDeleteUser}>Видалити</button>;
};

export default DeleteUser;
