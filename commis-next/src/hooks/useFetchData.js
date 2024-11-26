
// import { useState, useEffect } from "react";

// const useFetchData = (fetchFunction, keyValue = null) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Виклик fetchFunction без keyValue, якщо воно не передано
//                 const result = keyValue ? await fetchFunction(keyValue) : await fetchFunction();
//                 setData(result.data || result);
//             } catch (err) {
//                 setError(err.message || "An error occurred");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [fetchFunction, keyValue]);

//     return { data, loading, error };
// };

// export default useFetchData;



import { useState, useEffect } from "react";

const useFetchData = (fetchFunction, keyValue = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); // Початково не завантажується
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (keyValue === null || keyValue === undefined) return; // Пропустити запит, якщо ключ недоступний

            setLoading(true); // Увімкнути індикатор завантаження перед запитом
            try {
                // Виклик fetchFunction з параметром, якщо він переданий
                const result = await fetchFunction(keyValue);
                setData(result.data || result); // Обробка результату
            } catch (err) {
                setError(err.message || "An error occurred"); // Обробка помилок
            } finally {
                setLoading(false); // Завершення завантаження
            }
        };

        fetchData(); // Виклик запиту
    }, [fetchFunction, keyValue]);

    return { data, loading, error }; // Повернення станів
};

export default useFetchData;

