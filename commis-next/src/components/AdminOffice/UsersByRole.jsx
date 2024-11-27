
import Link from "next/link";
import { useRouter } from "next/router";
import { getUsersByRole } from "@/services/admin";
import { validateArray } from "@/utils/validation";
import useFetchDataWithArg from "@/hooks/useFetchDataWithArg";
import useLoadingAndError from "@/hooks/useLoadingAndError";

const UsersByRole = () => {
    const router = useRouter();
    const { role } = router.query;

    const { data: rawUsers, loading, error } = useFetchDataWithArg(getUsersByRole, role);
    const users = validateArray(rawUsers);

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
