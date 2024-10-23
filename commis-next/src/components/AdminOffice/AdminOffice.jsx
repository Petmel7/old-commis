
import Link from "next/link";
import adminDataList from "./adminDatalList";

const AdminOffice = () => {
    return (
        <div>
            <h3>Кабінет адміністратора</h3>
            <ul>
                {adminDataList.map((item, index) => (
                    <li key={index}>
                        <Link href={`/admin/${item.slug}`}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminOffice;
