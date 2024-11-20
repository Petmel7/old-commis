
import useFetchData from '@/hooks/useFetchData';
import { getNewSellers } from '@/services/admin';

const NewSellers = () => {
    const { data: sellers, loading, error } = useFetchData(getNewSellers);

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

export default NewSellers;
