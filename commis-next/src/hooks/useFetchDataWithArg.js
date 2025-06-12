// import { useState, useEffect } from "react";

// const useFetchDataWithArg = (fetchFunction, arg) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (arg === null || arg === undefined) return;

//             setLoading(true);
//             try {
//                 const result = await fetchFunction(arg);
//                 setData(result.data || result);
//             } catch (err) {
//                 setError(err.message || "An error occurred");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [fetchFunction, arg]);

//     return { data, loading, error };
// };

// export default useFetchDataWithArg;


import { useEffect, useState } from 'react';

const useFetchDataWithArg = (fetchFunction, arg = null, initialPage = 1, limit = 10) => {
    const [page, setPage] = useState(initialPage);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = arg
                    ? await fetchFunction(arg, page, limit)
                    : await fetchFunction(page, limit);
                console.log('result', result);
                setData(result.data || result);
                setTotalPages(result.totalPages || 1);
            } catch (err) {
                setError(err.message || 'Помилка при завантаженні даних');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, arg, fetchFunction, limit]);

    return { data, loading, error, page, setPage, totalPages };
};

export default useFetchDataWithArg;
