// import { useState } from "react";
// import { blockUser } from "@/services/admin";

// const BlockUserButton = ({ userId, isBlocked, onStatusChange }) => {
//     const [loading, setLoading] = useState(false);

//     const toggleBlockStatus = async () => {
//         setLoading(true);
//         try {
//             const response = await blockUser(userId);
//             console.log('++++++toggleBlockStatus->response', response);
//             onStatusChange(response.data.user);
//         } catch (error) {
//             console.error("Помилка блокування користувача:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <button onClick={toggleBlockStatus} disabled={loading}>
//             {isBlocked ? 'Розблокувати' : 'Заблокувати'}
//         </button>
//     );
// };

// export default BlockUserButton;






import { useState } from "react";
import { blockUser } from "@/services/admin";

const BlockUserButton = ({ userId, isBlocked, onStatusChange }) => {
    const [loading, setLoading] = useState(false);

    const toggleBlockStatus = async () => {
        setLoading(true);
        try {
            const response = await blockUser(userId, isBlocked);
            console.log('++++++toggleBlockStatus->response', response);
            onStatusChange(response.user);
        } catch (error) {
            console.error("Помилка блокування користувача:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={toggleBlockStatus} disabled={loading}>
            {isBlocked ? 'Розблокувати' : 'Заблокувати'}
        </button>
    );
};

export default BlockUserButton;