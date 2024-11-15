import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { baseUrl } from "@/components/Url/baseUrl";
import UserProductsCart from "@/components/Product/UserProductsCart";

const SellerProducts = () => {
    const router = useRouter();
    const { sellerId } = router.query;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    return (
        <div>
            <h3>Продукти продавця</h3>
            <ul className='product-list'>
                {products.map((product) => (
                    <UserProductsCart
                        productId={product.id}
                        pathProductId={`/products/userDetails/${product.id}`}
                        productImages={`${baseUrl}${product.images[0]}`}
                        productNames={product.name}
                        productPrices={product.price}
                    />
                ))}
            </ul>
        </div>
    );
};

export default SellerProducts;

