
import { useState, useEffect } from "react";
import { getActiveSellers } from "@/services/admin";
import Link from "next/link";

const ActiveSellers = () => {
    const [sellers, setSelers] = useState([]);

    useEffect(() => {
        const fetchActiveSellers = async () => {
            const activeSellers = await getActiveSellers();
            setSelers(activeSellers.data);
        }
        fetchActiveSellers();
    }, []);

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
}

export default ActiveSellers;