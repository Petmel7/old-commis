
// import { useState, useEffect } from "react";

// const useFetchData = (fetchFunction) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const result = await fetchFunction();

//                 if (!result || typeof result !== 'object') {
//                     throw new Error('Unexpected response format');
//                 }

//                 setData(result.data || result);
//             } catch (err) {
//                 setError(err.message || "An error occurred");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [fetchFunction]);

//     return { data, loading, error };
// };

// export default useFetchData;




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
