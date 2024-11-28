
import { useRouter } from "next/router";
import { baseUrl } from "@/components/Url/baseUrl";
import { getActiveSellerById } from "@/services/admin";
import useFetchDataWithArg from "@/hooks/useFetchDataWithArg";
import useLoadingAndError from "@/hooks/useLoadingAndError";
import UserProductsCart from "@/components/Product/UserProductsCart";

const SellerProducts = () => {
    const router = useRouter();
    const { sellerId } = router.query;

    console.log('&&&&&&&&&&&&&sellerId', sellerId);

    // Викликаємо API для отримання даних продавця
    const { data: rawSeller, loading, error } = useFetchDataWithArg(getActiveSellerById, sellerId);

    // Витягуємо список продуктів з поля `products`
    const seller = Array.isArray(rawSeller) ? rawSeller[0] : rawSeller;
    const products = seller?.products || []; // Безпечний доступ до продуктів

    const loadingAndError = useLoadingAndError(loading, error);

    if (loadingAndError) return loadingAndError;

    console.log('&&&&&&&&&&&&&products', products);

    return (
        <div>
            <h3>Продукти продавця</h3>
            <ul className='product-list'>
                {products.map((product) => (
                    <li key={product.id} className='product-item'>
                        <UserProductsCart
                            pathProductId={`/products/userDetails/${product.id}`}
                            productImages={`${baseUrl}${product.images[0]}`} // Перше зображення
                            productNames={product.name}
                            productPrices={product.price}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SellerProducts;


