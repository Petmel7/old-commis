// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import Modal from "../Modal/Modal";
// import useModal from "@/hooks/useModal";

// const UserStatusText = ({ isBlocked }) => {
//     const { isModalOpen, openModal, closeModal } = useModal();
//     const router = useRouter();

//     useEffect(() => {
//         if (isBlocked) {
//             openModal();
//         }
//     }, [isBlocked, openModal]);

//     const handleClose = () => {
//         closeModal();
//         router.push('/');
//     }

//     return (
//         <Modal show={isModalOpen} onClose={handleClose} text='Ви заблоковані адміністратором цього магазину!' />
//     )
// };

// export default UserStatusText;





import { useRouter } from "next/router";

const UserStatusText = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    }

    return (
        <div>
            <p>Ви заблоковані адміністратором цього магазину!</p>
            <button onClick={handleClick}>На головну</button>
        </div>
    )
};

export default UserStatusText;