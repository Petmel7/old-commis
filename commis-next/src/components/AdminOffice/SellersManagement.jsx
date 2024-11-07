
import useFetchUsers from "@/hooks/useFetchUsers";

const SellersManagement = () => {
    const { users, loadingErrorComponent } = useFetchUsers();

    const filteredSellers = users.filter(seller => seller.slug === 'seller');

    if (loadingErrorComponent) return loadingErrorComponent;

    return (
        <ul>
            {filteredSellers.map((seller, index) => (
                <li key={index}>
                    {seller.title}
                </li>
            ))}
        </ul>
    )
}

export default SellersManagement;