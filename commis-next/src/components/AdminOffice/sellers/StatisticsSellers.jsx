import useFetchData from "@/hooks/useFetchData";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import { getSellerStatistics } from "@/services/admin";
import Link from "next/link";

const StatisticsSellers = () => {

    const { data: sellers, loading, error } = useFetchData(getSellerStatistics);
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