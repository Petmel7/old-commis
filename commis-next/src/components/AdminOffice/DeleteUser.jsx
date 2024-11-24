import { deleteUser } from "@/services/admin";
import { useAuth } from "@/context/AuthContext";
import styles from './styles/UserDetails.module.css';

const DeleteUser = ({ userId, onDelete }) => {
    const { user, handleLogout } = useAuth();

    const handleDeleteUser = async () => {
        try {
            // Видалення користувача на сервері
            await deleteUser(userId);

            if (onDelete) onDelete();

            // Якщо видаляється поточний користувач
            if (user && user.id === userId) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                handleLogout(); // Виклик handleLogout для очищення контексту
            }

        } catch (error) {
            console.error("handleDeleteUser->error", error);
            alert('Не вдалося видалити користувача');
        }
    };

    return <button className={styles.deleteUserButton} onClick={handleDeleteUser}>Видалити</button>;
};

export default DeleteUser;


