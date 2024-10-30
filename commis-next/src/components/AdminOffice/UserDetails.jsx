
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "@/services/admin";
import DeleteUser from "./DeleteUser";
import Modal from "../Modal/Modal";
import BlockUserButton from "./BlockUserButton";
import useModal from "@/hooks/useModal";
import styles from './styles/UserDetails.module.css';

const UserDetails = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { isModalOpen, openModal, closeModal } = useModal();
    const [userById, setUserById] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editData, setEditData] = useState({ name: "", email: "", phone: "", role: "" });

    const roleTranslations = {
        buyer: 'Покупець',
        seller: 'Продавець',
        superadmin: 'Адміністратор'
    };

    useEffect(() => {
        const fetchUserById = async () => {
            if (userId) {
                const userData = await getUserById(userId);
                setUserById(userData);
                setEditData({ // Заповнення форми поточними даними користувача
                    name: userData.name || "",
                    email: userData.email || "",
                    phone: userData.phone || "",
                    role: userData.role || ""
                });
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
        e.preventDefault(); // Запобігає перезавантаженню сторінки
        try {
            await updateUser(userId, editData);
            setUserById({ ...userById, ...editData }); // Оновлюємо дані користувача в стані
            setIsEditMode(false); // Вихід з режиму редагування
        } catch (error) {
            console.log('handleEditSubmit->error', error);
        }
    }

    if (!userById) return <p>Завантаження...</p>;
    const date = new Date(userById.createdat).toLocaleDateString("uk-UA");

    console.log('*******userById', userById)

    return (
        <div>
            <h3>Деталі користувача</h3>
            {!isEditMode ? (
                <>
                    <p>Ім'я: {userById.name}</p>
                    <p>Email: {userById.email}</p>
                    <p>Номер: {userById.phone}</p>
                    <p>Роль: {roleTranslations[userById.role] || userById.role}</p>
                    <p>Дата створення: {date}</p>

                    <button onClick={handleEditClick}>Редагувати</button>
                    <button onClick={openModal}>Видалити</button>
                    <BlockUserButton userId={userId} isBlocked={userById.is_blocked} onStatusChange={setUserById} />

                    <Modal show={isModalOpen} onClose={closeModal}
                        text='Ви справді хочете видалити цього користувача? Ця дія видалить користувача разом з його продуктами!'
                    >
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
                    <button type="submit">Зберегти</button> {/* Зміна на "Зберегти" */}
                </form>
            )}
        </div>
    );
};

export default UserDetails;
