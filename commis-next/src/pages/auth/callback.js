
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile } from '@/services/auth'; // Припустимо, що у вас є такий сервіс для отримання інформації про користувача

const AuthCallback = ({ onLogin, onPhoneAdded, setGoogleRegistered }) => {
    const router = useRouter();
    const { refreshToken } = router.query;

    useEffect(() => {
        const authenticate = async () => {
            try {
                localStorage.setItem('refreshToken', refreshToken);
                console.log('AuthCallback->refreshToken', refreshToken);
                onLogin();

                // Припустимо, що після успішної авторизації ви отримуєте токен доступу
                const accessToken = localStorage.getItem('accessToken');

                // Отримуємо інформацію про користувача
                const userProfile = await getUserProfile(accessToken);
                console.log('AuthCallback->userProfile$$$$', userProfile);

                // Перевіряємо, чи є у користувача номер телефону
                if (userProfile.phone) {
                    router.push('/');
                } else {
                    onPhoneAdded(); // Відкриваємо модальне вікно для додавання номера телефону
                }

                // Перевіряємо, чи зареєстрований користувач через Google
                if (userProfile.googleRegistered) {
                    setGoogleRegistered(true);
                } else {
                    setGoogleRegistered(false);
                }
            } catch (error) {
                console.error('Помилка авторизації через Google:', error);
            }
        };

        if (refreshToken) {
            authenticate();
        }
    }, [refreshToken, router]);

    return <div>Authorizing...</div>;
};

export default AuthCallback;

