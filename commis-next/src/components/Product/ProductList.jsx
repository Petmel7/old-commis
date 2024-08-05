
// import React from 'react';
// import ProductCard from './ProductCard';
// import styles from './styles/ProductCard.module.css';

// const ProductList = ({ products }) => (

//     <ul className={styles.productList}>
//         {products.map(product => (
//             <li className={styles.productChildren} key={product.id}>
//                 <ProductCard product={product} />
//             </li>
//         ))}
//     </ul>
// );

// export default ProductList;





import React from 'react';
import ProductCard from './ProductCard';
import styles from './styles/ProductCard.module.css';

const ProductList = ({ products }) => {

    console.log('ProductList->products', products);

    return (
        <ul className={styles.productList}>
            {products.map(product => (
                <li className={styles.productChildren} key={product.id}>
                    <ProductCard product={product} />
                </li>
            ))}
        </ul>
    )
};

export default ProductList;