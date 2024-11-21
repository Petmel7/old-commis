
import useFetchData from '@/hooks/useFetchData';
import { getBlockedSellers } from '@/services/admin';
import useLoadingAndError from '@/hooks/useLoadingAndError';

const BlockedSellers = () => {
    const { data: sellers, loading, error } = useFetchData(getBlockedSellers);
    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

    return (
        <div>
            <h3>Blocked Sellers</h3>
            <ul>
                {sellers.map((seller) => (
                    <li key={seller.id}>
                        {seller.name} ({seller.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlockedSellers;
