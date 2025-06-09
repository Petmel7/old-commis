
import Link from "next/link";
import { useRouter } from "next/router";
import { getUsersByRole } from "@/services/admin";
import { validateArray } from "@/utils/validation";
import useFetchDataWithArg from "@/hooks/useFetchDataWithArg";
import useLoadingAndError from "@/hooks/useLoadingAndError";

const UsersByRole = () => {

    const router = useRouter();
    const { role } = router.query;

    const roleValue =
        role === 'admin' ? 'superadmin' :
            role;

    const { data: rawUsers, loading, error } = useFetchDataWithArg(getUsersByRole, roleValue);

    const users = validateArray(rawUsers);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    const roleTranslate =
        role === 'buyer' ? 'Покупці' :
            role === 'seller' ? 'Продавці' :
                role === 'admin' ? 'Адміністратори' :
                    'Користувачі';

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div>
            <h3>{roleTranslate}</h3>

            {users.length === 0 ? (
                <p>{roleTranslate} ще не зареєстровані.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <Link key={user.id} href={`/admin/user-details/${user.id}`}>
                            <li>
                                <p>{user.name}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersByRole;

