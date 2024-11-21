
import { deleteUser } from "@/services/admin";
import styles from './styles/UserDetails.module.css';

const DeleteUser = ({ userId, onDelete }) => {
    const handleDeleteUser = async () => {

        try {
            await deleteUser(userId);
            if (onDelete) onDelete();
        } catch (error) {
            console.error("handleDeleteUser->error", error);
            alert('Не вдалося видалити користувача');
        }
    };

    return <button className={styles.deleteUserButton} onClick={handleDeleteUser}>Видалити</button>;
};

export default DeleteUser;
