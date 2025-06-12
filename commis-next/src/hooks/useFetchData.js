
// import { useState, useEffect } from "react";

// const useFetchData = (fetchFunction, validateData = null) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const result = await fetchFunction();
//                 const validatedResult = validateData ? validateData(result.data || result) : result.data || result;

//                 setData(validatedResult);
//             } catch (err) {
//                 setError(err.message || "An error occurred");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [fetchFunction, validateData]);

//     return { data, loading, error };
// };

// export default useFetchData;





import { useState, useEffect } from "react";

const useFetchData = (fetchFunction, initialPage = 1, limit = 10) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await fetchFunction(page, limit);
                setData(result.data || []);
                setTotalPages(result.totalPages || 1);
            } catch (err) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFunction, page, limit]);

    return { data, loading, error, page, setPage, totalPages };
};

export default useFetchData;

