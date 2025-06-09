import Link from "next/link";
import { getActiveSellers } from '@/services/admin';
import { validateArray } from "@/utils/validation";
import useFetchData from '@/hooks/useFetchData';
import useLoadingAndError from '@/hooks/useLoadingAndError';

const ActiveSellers = () => {
    const { data: rawSellers, loading, error } = useFetchData(getActiveSellers);
    const sellers = validateArray(rawSellers);

    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

    return (
        <div>
            <p>Активні продавці</p>
            <ul>
                {sellers.map(seller => (
                    <li key={seller.id}>
                        <Link href={`/admin/seller/active-sellers/${seller.id}`}>
                            {seller.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveSellers;