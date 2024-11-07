import { useState, useEffect } from "react";
import { getUserRoleCounts } from "@/services/admin";

const SellersManagement = () => {
    const [selers, setSelers] = useState([]);

    useEffect(() => {
        const fetchSelers = async () => {
            const sellersManagement = await getUserRoleCounts();
            setSelers(sellersManagement);
        }
        fetchSelers();
    }, []);

    const filteredSellers = selers.filter(seler => seler.role === 'seler');

    return (
        <ul>
            {filteredSellers.map(seler => (
                <li>
                    {seler.title}
                </li>
            ))}
        </ul>
    )
}

export default SellersManagement;