import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { addFavorite, deleteFavorite } from '@/services/favorites';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import HeartIcon from '../../../public/img/Heart.svg';
import styles from '../Product/styles/ProductCard.module.css';

const FavoriteButton = ({ product, isFavorite = false, favoriteId = null }) => {
    const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);
    const [favoriteRecordId, setFavoriteRecordId] = useState(favoriteId);
    const { saveFavorite, removeFavorite, loadFavorites } = useFavorites();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        setFavoriteStatus(isFavorite);
        setFavoriteRecordId(favoriteId);
    }, [isFavorite, favoriteId]);

    const handleFavoriteClick = async () => {
        try {
            if (favoriteStatus && favoriteRecordId) {
                await deleteFavorite(favoriteRecordId);
                setFavoriteStatus(false);
                setFavoriteRecordId(null);
                removeFavorite(favoriteRecordId);
            } else if (isAuthenticated) {
                const response = await addFavorite(product.id);
                setFavoriteStatus(true);
                setFavoriteRecordId(response.id);
                saveFavorite(response);
            } else {
                router.push('/login');
            }
            await loadFavorites();
        } catch (error) {
            console.error('Помилка при оновленні статусу вибраного:', error);
        }
    };

    return (
        <div className={styles.buttonContainer}>
            <HeartIcon
                className={`${styles.favoriteButton} ${favoriteStatus ? styles.favorite : ''}`}
                onClick={handleFavoriteClick}
            />
        </div>
    );
};

export default FavoriteButton;






// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import { addFavorite, deleteFavorite } from '@/services/favorites';
// import { useFavorites } from '@/context/FavoritesContext';
// import { useAuth } from '@/context/AuthContext';
// import HeartIcon from '../../../public/img/Heart.svg';
// import UserStatusText from '../UserStatusText/UserStatusText';
// import styles from '../Product/styles/ProductCard.module.css';

// const FavoriteButton = ({ product, isFavorite = false, favoriteId = null }) => {
//     const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);
//     const [favoriteRecordId, setFavoriteRecordId] = useState(favoriteId);
//     const { saveFavorite, removeFavorite, loadFavorites } = useFavorites();
//     const { isAuthenticated, isBlocked } = useAuth();
//     const [showStatusModal, setShowStatusModal] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         setFavoriteStatus(isFavorite);
//         setFavoriteRecordId(favoriteId);
//     }, [isFavorite, favoriteId]);

//     const handleFavoriteClick = async () => {
//         try {
//             if (favoriteStatus && favoriteRecordId) {
//                 await deleteFavorite(favoriteRecordId);
//                 setFavoriteStatus(false);
//                 setFavoriteRecordId(null);
//                 removeFavorite(favoriteRecordId);
//             } else if (isAuthenticated) {
//                 const response = await addFavorite(product.id);
//                 setFavoriteStatus(true);
//                 setFavoriteRecordId(response.id);
//                 saveFavorite(response);
//             } else {
//                 router.push('/login');
//             }
//             await loadFavorites();
//         } catch (error) {
//             console.error('Помилка при оновленні статусу вибраного:', error);
//         }
//     };

//     const handleClick = () => {
//         if (isBlocked) {
//             setShowStatusModal(true);
//         } else {
//             handleFavoriteClick();
//         }
//     };

//     return (
//         <>
//             <div className={styles.buttonContainer}>
//                 <HeartIcon
//                     className={`${styles.favoriteButton} ${favoriteStatus ? styles.favorite : ''}`}
//                     onClick={handleClick}
//                 />
//                 {/* Відображення модального вікна для заблокованого користувача */}
//                 {showStatusModal && <UserStatusText />}
//             </div>
//         </>
//     );
// };

// export default FavoriteButton;






// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import { addFavorite, deleteFavorite } from '@/services/favorites';
// import { useFavorites } from '@/context/FavoritesContext';
// import { useAuth } from '@/context/AuthContext';
// import HeartIcon from '../../../public/img/Heart.svg';
// import styles from '../Product/styles/ProductCard.module.css';

// const FavoriteButton = ({ product, isFavorite = false, favoriteId = null, setBlockedStatus }) => {
//     const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);
//     const [favoriteRecordId, setFavoriteRecordId] = useState(favoriteId);
//     const { saveFavorite, removeFavorite, loadFavorites } = useFavorites();
//     const { isAuthenticated, isBlocked } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         setFavoriteStatus(isFavorite);
//         setFavoriteRecordId(favoriteId);
//     }, [isFavorite, favoriteId]);

//     const handleFavoriteClick = async () => {
//         try {
//             if (favoriteStatus && favoriteRecordId) {
//                 await deleteFavorite(favoriteRecordId);
//                 setFavoriteStatus(false);
//                 setFavoriteRecordId(null);
//                 removeFavorite(favoriteRecordId);
//             } else if (isAuthenticated) {
//                 const response = await addFavorite(product.id);
//                 setFavoriteStatus(true);
//                 setFavoriteRecordId(response.id);
//                 saveFavorite(response);
//             } else {
//                 router.push('/login');
//             }
//             await loadFavorites();
//         } catch (error) {
//             console.error('Помилка при оновленні статусу вибраного:', error);
//         }
//     };

//     const handleClick = () => {
//         if (isBlocked) {
//             setBlockedStatus(true); // Встановлює стан блокування
//         } else {
//             handleFavoriteClick();
//         }
//     };

//     return (
//         <div className={styles.buttonContainer}>
//             <HeartIcon
//                 className={`${styles.favoriteButton} ${favoriteStatus ? styles.favorite : ''}`}
//                 onClick={handleClick}
//             />
//         </div>
//     );
// };

// export default FavoriteButton;
