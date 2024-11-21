
import { useEffect, useState } from "react";
import { getUsersForAdmin, getOrdersForAdmin, getProductsForAdmin, getUserRoleCounts } from "@/services/admin";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import styles from './styles/Dashboard.module.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: [],
        orders: [],
        products: [],
        roleUsers: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [usersForAdmin, ordersForAdmin, productsForAdmin, roleData] = await Promise.all([
                    getUsersForAdmin(),
                    getOrdersForAdmin(),
                    getProductsForAdmin(),
                    getUserRoleCounts(),
                ]);
                setStats({
                    users: usersForAdmin,
                    orders: ordersForAdmin,
                    products: productsForAdmin,
                    roleUsers: roleData,
                });
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loadingErrorComponent) return loadingErrorComponent;

    const { users, orders, products, roleUsers } = stats;

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
};

export default Dashboard;

