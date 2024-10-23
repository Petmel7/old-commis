import { useEffect, useState } from "react";
import { getUsersForAdmin } from "@/services/admin";

const Dashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersForAdmin = async () => {
            const usersForAdmin = await getUsersForAdmin();
            setUsers(usersForAdmin);
            console.log('Dashboard->usersForAdmin', usersForAdmin);
        }
        fetchUsersForAdmin();
    }, []);

    return (
        <div>
            <h3>Dashboard</h3>
            <p>Загальна кількість користувачів: {users.length}</p>
        </div>
    )
}

export default Dashboard;