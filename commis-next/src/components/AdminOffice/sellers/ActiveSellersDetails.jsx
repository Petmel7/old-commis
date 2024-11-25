
import { useRouter } from "next/router";
import { getActiveSellerById } from "@/services/admin";
import { formatDate } from "@/utils/formatDate";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";

const ActiveSellersDetails = () => {
    const router = useRouter();
    const { sellerId } = router.query;

    const { data: seller, loading, error } = useFetchData(getActiveSellerById, sellerId);

    const handleStorageSave = () => {
        if (seller?.products) {
            localStorage.setItem("products", JSON.stringify(seller.products));
        }
    };

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!seller) return <p>Продавця не знайдено</p>;

    const date = formatDate(seller.last_login);

    return (
        <div>
            <h3>Active Sellers Details</h3>
            <p>Ім'я: {seller.name}</p>
            <p>Номер: {seller.phone}</p>
            <p>email: {seller.email}</p>
            <p>Дата останнього логування: {date}</p>

            <Link href={`/admin/seller/products/${sellerId}`} onClick={handleStorageSave}>
                <p>Модерація товарів</p>
            </Link>
        </div>
    );
};

export default ActiveSellersDetails;
