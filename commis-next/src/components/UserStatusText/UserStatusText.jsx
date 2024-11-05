
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