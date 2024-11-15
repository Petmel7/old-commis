import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getActiveSellerById } from "@/services/admin";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

const ActiveSellersDetails = () => {
    const [seller, setSeler] = useState([]);
    const router = useRouter();
    const { sellerId } = router.query;

    useEffect(() => {
        const fetchActiveSellerById = async () => {
            if (!sellerId) return;
            const activeSellerById = await getActiveSellerById(sellerId);
            setSeler(activeSellerById.data);
        };
        fetchActiveSellerById();
    }, [sellerId]);

    const date = formatDate(seller?.last_login);

    const handleStorageSave = () => {
        localStorage.setItem('products', JSON.stringify(seller.products));
    }

    console.log('|||||||||||||||||||||seller', seller);
    return (
        <div>
            <h3>Active Sellers Details</h3>
            <p>Імя: {seller.name}</p>
            <p>Номер: {seller.phone}</p>
            <p>email: {seller.email}</p>
            <p>Дата остатнього логування: {date}</p>

            <Link
                href={`/admin/seller/products/${sellerId}`}
                onClick={handleStorageSave}
            >
                <p>Продукти</p>
            </Link>

        </div>
    )
}

export default ActiveSellersDetails;