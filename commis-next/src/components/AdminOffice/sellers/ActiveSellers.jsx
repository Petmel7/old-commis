import Link from "next/link";
import useFetchData from '@/hooks/useFetchData';
import { getActiveSellers } from '@/services/admin';
import useLoadingAndError from '@/hooks/useLoadingAndError';

const ActiveSellers = () => {
    const { data: sellers, loading, error } = useFetchData(getActiveSellers);
    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

    return (
        <div>
            <p>Active Sellers</p>
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