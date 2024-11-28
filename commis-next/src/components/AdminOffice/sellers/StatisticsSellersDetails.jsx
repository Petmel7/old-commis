import { useRouter } from "next/router";
import { staticsSellerById } from "@/services/admin";
import { validateArray } from "@/utils/validation";
import useFetchDataWithArg from "@/hooks/useFetchDataWithArg";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import styles from './styles/StatisticsSellerDetails.module.css';

const StatisticsSellersDetails = () => {
    const router = useRouter();

    const { sellerId } = router.query

    const { data: rawSeller, loading, error } = useFetchDataWithArg(staticsSellerById, sellerId);
    const seller = validateArray(rawSeller);

    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

    return (
        <div className={styles.container}>
            <p className={styles.info}><span>Імя:</span> {seller[0]?.name}</p>
            <p className={styles.info}><span>Пошта:</span> {seller[0]?.email}</p>
            <p className={styles.total}>
                Загальна кількість проданих товарів: <span>{seller[0]?.total_sold_items}</span>
            </p>
            <p className={styles.total}>
                Загальна продана кількість: <span>{seller[0]?.total_quantity_sold}</span>
            </p>
        </div>
    );
}

export default StatisticsSellersDetails;
