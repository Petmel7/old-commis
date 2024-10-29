// const EditUserForm = () => {

//     const handleEditClick = () => {
//         setIsEditMode(true);
//         openModal();
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleUpdateUser = async () => {
//         try {
//             await updateUser(userId, editData);
//             setUserById((prevUser) => ({ ...prevUser, ...editData }));
//             setIsEditMode(false);
//             closeModal();
//         } catch (error) {
//             console.error("Помилка при оновленні користувача:", error);
//         }
//     };

//     return (
//         <></>
//     )
// }

// export default EditUserForm;
