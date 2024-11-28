import useFetchData from "@/hooks/useFetchData";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import { getSellerStatistics } from "@/services/admin";
import { validateArray } from "@/utils/validation";
import Link from "next/link";
import styles from './styles/SellerStatistics.module.css';

const StatisticsSellers = () => {

    const { data: rawSellers, loading, error } = useFetchData(getSellerStatistics);
    const sellers = validateArray(rawSellers);
    const LoadingAndError = useLoadingAndError(loading, error);

    if (LoadingAndError) return LoadingAndError;

    return (
        <div className={styles.container}>
            <h3 className={styles.header}>Статистика продавців</h3>
            <ul className={styles.list}>
                {sellers.map(seller => (
                    <li key={seller.id} className={styles.listItem}>
                        <Link href={`/admin/seller/statistics-sellers/${seller.id}`} className={styles.link}>
                            <p>{seller.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StatisticsSellers;