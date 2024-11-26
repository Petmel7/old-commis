// import { useRouter } from "next/router";
// import { staticsSellerById } from "@/services/admin";
// // import useFetchData from "@/hooks/useFetchData";
// import useFetchDataWithArg from "@/hooks/useFetchDataWithArg";
// import useLoadingAndError from "@/hooks/useLoadingAndError";

// const StatisticsSellersDetails = () => {
//     const router = useRouter();
//     console.log('===============router', router);

//     if (!router.isReady) return;

//     const { sellerId } = router.query

//     // if (!sellerId) return <p>Loading...</p>;

//     console.log('===============sellerId', sellerId);

//     const { data: seller, loading, error } = useFetchDataWithArg(staticsSellerById, sellerId);

//     console.log('===============seller', seller);

//     const loadingAndError = useLoadingAndError(loading, error);

//     if (loadingAndError) return loadingAndError;

//     return (
//         <div>
//             <p>{seller[0]?.name}</p>
//             <p>{seller[0]?.email}</p>
//             <p>Загальна кількість проданих товарів: {seller[0]?.total_sold_items}</p>
//             <p>Загальна продана кількість: {seller[0]?.total_quantity_sold}</p>
//         </div>
//     )
// }

// export default StatisticsSellersDetails;





// import { useRouter } from "next/router";
// import { staticsSellerById } from "@/services/admin";
// import useFetchData from "@/hooks/useFetchData";
// import useLoadingAndError from "@/hooks/useLoadingAndError";

// const StatisticsSellersDetails = () => {
//     const router = useRouter();
//     const { sellerId } = router.query;

//     // Викликаємо useFetchData, навіть якщо sellerId ще не доступний
//     const { data: seller, loading, error } = useFetchData(
//         staticsSellerById,
//         sellerId || null // Передаємо null, якщо sellerId недоступний
//     );

//     // Викликаємо useLoadingAndError поза умовними конструкціями
//     const loadingAndError = useLoadingAndError(loading, error);

//     // Відображаємо завантаження або помилки
//     if (loadingAndError) return loadingAndError;

//     // Якщо даних немає, показуємо інше повідомлення
//     if (!seller) return <p>No data available</p>;

//     return (
//         <div>
//             <h3>Statistics Sellers Details</h3>
//             <p>Name: {seller.name}</p>
//             <p>Email: {seller.email}</p>
//             <p>Total Sold Items: {seller.total_sold_items}</p>
//             <p>Total Quantity Sold: {seller.total_quantity_sold}</p>
//         </div>
//     );
// };

// export default StatisticsSellersDetails;



import { useRouter } from "next/router";
import { staticsSellerById } from "@/services/admin";
import useFetchData from "@/hooks/useFetchData";
import useLoadingAndError from "@/hooks/useLoadingAndError";

const StatisticsSellersDetails = () => {
    const router = useRouter();
    const { sellerId } = router.query;

    // Перевірка доступності sellerId
    const { data: seller, loading, error } = useFetchData(staticsSellerById, sellerId);

    const loadingAndError = useLoadingAndError(loading, error);

    // Відображення станів
    if (loadingAndError) return loadingAndError;

    // Обробка випадку, коли даних немає
    if (!seller) return <p>No seller data available.</p>;

    return (
        <div>
            <h3>Seller Details</h3>
            <p>Name: {seller.name}</p>
            <p>Email: {seller.email}</p>
            <p>Total Sold Items: {seller.total_sold_items}</p>
            <p>Total Quantity Sold: {seller.total_quantity_sold}</p>
        </div>
    );
};

export default StatisticsSellersDetails;

