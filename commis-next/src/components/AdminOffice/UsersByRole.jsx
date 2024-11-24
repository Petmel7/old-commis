
import Link from "next/link";
import { useRouter } from "next/router";
import { getUsersByRole } from "@/services/admin";
import useFetchData from "@/hooks/useFetchData";
import useLoadingAndError from "@/hooks/useLoadingAndError";

const UsersByRole = () => {
    const router = useRouter();
    const { role } = router.query;
    const { data: users, loading, error } = useFetchData(getUsersByRole, role);
    const loadingErrorComponent = useLoadingAndError(loading, error);

    const roleTranslate = role === 'buyer' ? 'Покупці' : role === 'seller' ? 'Продавці' : 'Користувачі';

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div>
            <h3>{roleTranslate}</h3>
            <ul>
                {users.map((user) => (
                    <Link key={user.id} href={`/admin/user-details/${user.id}`}>
                        <li>
                            <p>{user.name}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default UsersByRole;
