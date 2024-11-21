
import Link from "next/link";
import { useRouter } from "next/router";
import { getUsersByRole } from "@/services/admin";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import useFetchDataByKey from "@/hooks/useFetchDataByKey";

const UsersByRole = () => {
    const router = useRouter();
    const { role } = router.query;
    const { data: users, loading, error } = useFetchDataByKey(getUsersByRole, role);
    const loadingErrorComponent = useLoadingAndError(loading, error);

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div>
            <h3>{role === 'buyer' ? 'Покупці' : role === 'seller' ? 'Продавці' : 'Користувачі'}</h3>
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
