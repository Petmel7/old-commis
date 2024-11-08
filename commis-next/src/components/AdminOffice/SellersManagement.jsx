
import Link from "next/link";
import sellerDataList from "./sellers/sellerDataList";

const SellersManagement = () => {

    return (
        <ul>
            {sellerDataList.map((seller, index) => (
                <li key={index}>
                    <Link href={`/admin/seller/${seller.slug}`}>
                        {seller.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default SellersManagement;