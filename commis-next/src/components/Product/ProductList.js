
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
    <ul className="product-list">
        {products.map(product => (
            <ul>
                <ProductCard key={product.id} product={product} />
            </ul>
        ))}
    </ul>
);

export default ProductList;