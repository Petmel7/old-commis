
import { useState, useEffect } from "react";

const useFetchData = (fetchFunction, keyValue = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Виклик fetchFunction без keyValue, якщо воно не передано
                const result = keyValue ? await fetchFunction(keyValue) : await fetchFunction();
                setData(result.data || result);
            } catch (err) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFunction, keyValue]);

    return { data, loading, error };
};

export default useFetchData;

