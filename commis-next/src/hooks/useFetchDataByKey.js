import { useState, useEffect } from "react";

const useFetchDataByKey = (fetchFunction, keyValue) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!keyValue) return;

            try {
                const result = await fetchFunction(keyValue);
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

export default useFetchDataByKey;


