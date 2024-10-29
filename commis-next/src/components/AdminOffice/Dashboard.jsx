
import { useEffect, useState } from "react";
import { getUsersForAdmin, getOrdersForAdmin, getProductsForAdmin, getUserRoleCounts } from "@/services/admin";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import styles from './styles/Dashboard.module.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [roleUsers, setRoleUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        const fetchUsersForAdmin = async () => {
            try {
                const usersForAdmin = await getUsersForAdmin();
                setUsers(usersForAdmin);
                const ordersForAdmin = await getOrdersForAdmin();
                setOrders(ordersForAdmin);
                const productsForAdmin = await getProductsForAdmin();
                setProducts(productsForAdmin);
                const roleData = await getUserRoleCounts();
                setRoleUsers(roleData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchUsersForAdmin();
    }, []);

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <div className={styles.dashboardContainer}>
            <ul className={styles.dashboardStats}>
                <li>Загальна кількість користувачів: {users.length}</li>
                <li>Загальна кількість замовлень: {orders.length}</li>
                <li>Загальна кількість продуктів: {products.length}</li>
            </ul>
            <ul className={styles.roleList}>
                {roleUsers.map((roleUser, index) => (
                    <li key={index}>
                        <p>Загальна кількість {roleUser.title}: {roleUser.count}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
