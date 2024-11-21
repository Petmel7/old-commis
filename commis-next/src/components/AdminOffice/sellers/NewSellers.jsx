
import useFetchData from '@/hooks/useFetchData';
import { getNewSellers } from '@/services/admin';
import useLoadingAndError from '@/hooks/useLoadingAndError';

const NewSellers = () => {
    const { data: sellers, loading, error } = useFetchData(getNewSellers);
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

export default NewSellers;
