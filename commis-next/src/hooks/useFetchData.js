
import { useState, useEffect } from "react";

const useFetchData = (fetchFunction, validateData = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await fetchFunction();
                const validatedResult = validateData ? validateData(result.data || result) : result.data || result;

                setData(validatedResult);
            } catch (err) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFunction, validateData]);

    return { data, loading, error };
};

export default useFetchData;
