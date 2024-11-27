import { useRouter } from "next/router";
import { staticsSellerById } from "@/services/admin";
import { validateArray } from "@/utils/validation";
import useFetchDataWithArg from "@/hooks/useFetchDataWithArg";
import useLoadingAndError from "@/hooks/useLoadingAndError";

const StatisticsSellersDetails = () => {
    const router = useRouter();

    if (!router.isReady) return;

    const { sellerId } = router.query

    const { data: rawSeller, loading, error } = useFetchDataWithArg(staticsSellerById, sellerId);
    const seller = validateArray(rawSeller);

    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

    return (
        <div>
            <p>{seller[0]?.name}</p>
            <p>{seller[0]?.email}</p>
            <p>Загальна кількість проданих товарів: {seller[0]?.total_sold_items}</p>
            <p>Загальна продана кількість: {seller[0]?.total_quantity_sold}</p>
        </div>
    )
}

export default StatisticsSellersDetails;
