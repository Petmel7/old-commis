import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/admin";

const UserDetails = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [userById, setUserById] = useState([]);
    console.log('|||UserDetails->userId', userId);

    useEffect(() => {
        const fetshUserById = async () => {
            const userById = await getUserById(userId);
            setUserById(userById);
        }
        fetshUserById();
    }, []);

    return (
        <>
            <h3>User Details</h3>
            <p>{userById.name}</p>
        </>
    )
}

export default UserDetails;