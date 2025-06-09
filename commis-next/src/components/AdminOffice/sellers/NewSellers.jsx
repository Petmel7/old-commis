
import useFetchData from '@/hooks/useFetchData';
import { getNewSellers } from '@/services/admin';
import { validateArray } from '@/utils/validation';
import useLoadingAndError from '@/hooks/useLoadingAndError';

const NewSellers = () => {
    const { data: rawSellers, loading, error } = useFetchData(getNewSellers);
    const sellers = validateArray(rawSellers);

    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

    return (
        <div>
            <h3>Нові продавці</h3>
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
