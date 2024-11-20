
import useFetchData from '@/hooks/useFetchData';
import { getActiveSellers } from '@/services/admin';
import Link from "next/link";

const ActiveSellers = () => {
    const { data: sellers, loading, error } = useFetchData(getActiveSellers);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error.message}</p>;

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