
import { useRouter } from "next/router";
import { getActiveSellerById } from "@/services/admin";
import { formatDate } from "@/utils/formatDate";
import useFetchDataWithArg from "@/hooks/useFetchDataWithArg";
import Link from "next/link";

const ActiveSellersDetails = () => {
    const router = useRouter();
    const { sellerId } = router.query;

    console.log('(((((((sellerId', sellerId);

    const { data: rawSeller, loading, error } = useFetchDataWithArg(getActiveSellerById, sellerId);

    const seller = Array.isArray(rawSeller) ? rawSeller[0] : rawSeller;

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!seller) return <p>Продавця не знайдено</p>;

    const date = formatDate(seller.last_login);

    console.log('(((((((seller', seller);

    return (
        <div>
            <h3>Active Sellers Details</h3>
            <p>Ім'я: {seller.name}</p>
            <p>Номер: {seller.phone}</p>
            <p>email: {seller.email}</p>
            <p>Дата останнього логування: {date}</p>

            <Link href={`/admin/seller/products/${sellerId}`}>
                <p>Модерація товарів</p>
            </Link>
        </div>
    );
};

export default ActiveSellersDetails;
