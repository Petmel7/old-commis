import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getActiveSellerById } from "@/services/admin";

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

    console.log('|||||||||||||||||||||seller', seller);
    return (
        <div>
            <h3>Active Sellers Details</h3>
            <p>{seller.name}</p>
            <p>{seller.email}</p>
            <p>{seller.last_login}</p>
        </div>
    )
}

export default ActiveSellersDetails;