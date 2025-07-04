import Link from "next/link";
import useFetchData from '@/hooks/useFetchData';
import { getBlockedSellers } from '@/services/admin';
import { validateArray } from '@/utils/validation';
import useLoadingAndError from '@/hooks/useLoadingAndError';

const BlockedSellers = () => {
    const { data: rawSellers, loading, error } = useFetchData(getBlockedSellers);
    const sellers = validateArray(rawSellers);

    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

    return (
        <div>
            <h3>Заблоковані продавці</h3>
            <ul>
                {sellers.map((seller) => (
                    <li key={seller.id}>
                        <Link key={seller.id} href={`/admin/user-details/${seller.id}`}>
                            {seller.name} ({seller.email})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlockedSellers;
