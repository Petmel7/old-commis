
import useFetchData from '@/hooks/useFetchData';
import { getBlockedSellers } from '@/services/admin';

const BlockedSellers = () => {
    const { data: sellers, loading, error } = useFetchData(getBlockedSellers);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error.message}</p>;

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
