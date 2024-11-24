
// import { useState, useEffect } from "react";
// import { getUserRoleCounts } from "@/services/admin";
// import useLoadingAndError from "./useLoadingAndError";

// const useFetchUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const loadingErrorComponent = useLoadingAndError(loading, error);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const usersData = await getUserRoleCounts();
//                 setUsers(usersData);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchUsers();
//     }, []);

//     return { users, loadingErrorComponent };
// };

// export default useFetchUsers;
