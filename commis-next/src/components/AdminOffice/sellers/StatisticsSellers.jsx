import useFetchData from "@/hooks/useFetchData";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import { getSellerStatistics } from "@/services/admin";
import { validateArray } from "@/utils/validation";
import Link from "next/link";

const StatisticsSellers = () => {

    const { data: rawSellers, loading, error } = useFetchData(getSellerStatistics);
    const sellers = validateArray(rawSellers);
    const LoadingAndError = useLoadingAndError(loading, error);

    if (LoadingAndError) return LoadingAndError;

    return (
        <>
            <h3>Statistics Sellers</h3>
            <ul>
                {sellers.map(seller =>
                    <li key={seller.id}>
                        <Link href={`/admin/seller/statistics-sellers/${seller.id}`}>
                            <p>{seller.name}</p>
                        </Link>
                    </li>
                )}
            </ul>
        </>
    )
}

export default StatisticsSellers;