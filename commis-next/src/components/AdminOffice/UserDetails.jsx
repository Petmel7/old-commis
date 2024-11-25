
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "@/services/admin";
import { formatDate } from "@/utils/formatDate";
import DeleteUser from "./DeleteUser";
import Modal from "../Modal/Modal";
import BlockedButton from "./BlockedButton";
import useModal from "@/hooks/useModal";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import styles from './styles/UserDetails.module.css';

const UserDetails = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { isModalOpen, openModal, closeModal } = useModal();
    const [userById, setUserById] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editData, setEditData] = useState({ name: "", email: "", phone: "", role: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const roleTranslations = {
        buyer: 'Покупець',
        seller: 'Продавець',
        superadmin: 'Адміністратор'
    };

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                if (userId) {
                    const userData = await getUserById(userId);
                    setUserById(userData);
                    setEditData({
                        name: userData.name || "",
                        email: userData.email || "",
                        phone: userData.phone || "",
                        role: userData.role || ""
                    });
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchUserById();
    }, [userId]);

    const handleDeleteUser = () => {
        router.push("/admin/users-management");
    };

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userId, editData);
            setUserById({ ...userById, ...editData });
            setIsEditMode(false);
        } catch (error) {
            console.log('handleEditSubmit->error', error);
        }
    };

    if (loadingErrorComponent) return loadingErrorComponent;
    if (!userById) return <p>Завантаження...</p>;

    const date = formatDate(userById?.createdat);
    const userStatus = userById.is_blocked ? 'заблокований' : 'активний';

    return (
        <div className={styles.userDetailsContainer}>
            <h3>Деталі користувача</h3>
            {!isEditMode ? (
                <>
                    <div className={styles.userInfo}>
                        <p>Ім'я: {userById.name}</p>
                        <p>Email: {userById.email}</p>
                        <p>Номер: {userById.phone}</p>
                        <p>Роль: {roleTranslations[userById.role] || userById.role}</p>
                        <p>Дата створення: {date}</p>
                        <p>Статус: Користувач {userById.name} {userStatus} </p>
                    </div>
                    <div className={styles.userActions}>
                        <button onClick={handleEditClick} className={styles.editButton}>Редагувати</button>
                        <button onClick={openModal} className={styles.deleteButton}>Видалити</button>

                        <BlockedButton
                            id={userId}
                            isBlocked={userById.is_blocked}
                            onStatusChange={setUserById}
                            type='user'
                            className={styles.blockButton}
                        />
                    </div>
                    <Modal show={isModalOpen} onClose={closeModal} text='Ви справді хочете видалити цього користувача? Ця дія видалить користувача разом з його продуктами!'>
                        <div className={styles.buttonContainer}>
                            <DeleteUser userId={userId} onDelete={handleDeleteUser} />
                            <button onClick={closeModal}>Відміна</button>
                        </div>
                    </Modal>
                </>
            ) : (
                <form className={styles.editForm} onSubmit={handleEditSubmit}>
                    <label>Ім'я:</label>
                    <input type="text" name="name" value={editData.name} onChange={handleChange} />

                    <label>Email:</label>
                    <input type="email" name="email" value={editData.email} onChange={handleChange} />

                    <label>Номер:</label>
                    <input type="text" name="phone" value={editData.phone} onChange={handleChange} />

                    <label>Роль:</label>
                    <select name="role" value={editData.role} onChange={handleChange}>
                        <option value="buyer">Покупець</option>
                        <option value="seller">Продавець</option>
                        <option value="superadmin">Адміністратор</option>
                    </select>
                    <button type="submit">Зберегти</button>
                </form>
            )}
        </div>
    );
};

export default UserDetails;
