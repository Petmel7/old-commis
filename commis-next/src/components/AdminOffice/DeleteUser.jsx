
import { deleteUser } from "@/services/admin";
import styles from './styles/UserDetails.module.css';

const DeleteUser = ({ userId, onDelete }) => {
    const handleDeleteUser = async () => {

        try {
            const response = await deleteUser(userId);

            console.log("Користувача успішно видалено");
            if (onDelete) onDelete(); // Викликаємо callback для повернення на список користувачів
        } catch (error) {
            console.error("handleDeleteUser->error", error);
        }
    };

    return <button className={styles.deleteUserButton} onClick={handleDeleteUser}>Видалити</button>;
};

export default DeleteUser;
