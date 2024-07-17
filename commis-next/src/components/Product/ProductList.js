import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
    <ul className="product-list">
        {products.map(product => (
            <li key={product.id}>
                <ProductCard product={product} />
            </li>
        ))}
    </ul>
);

export default ProductList;