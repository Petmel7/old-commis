
import React, { useState, useEffect } from 'react';
import { getSellerOrders } from '../../services/order';
import { baseUrl } from '../Url/baseUrl';
import styles from './styles/OrderList.module.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getSellerOrders();
                console.log('OrderList->orders', fetchedOrders);
                setOrders(fetchedOrders); // Оновлюємо стан замовленнями
            } catch (error) {
                console.log('OrderList->error', error);
            }
        }
        fetchOrders();
    }, []);

    // return (
    //     <ul className={styles}>
    //         {orders.map(item => (
    //             <li className={styles} key={item.id}>
    //                 <p className={styles}>{item.buyer_name}</p>
    //                 <span className={styles}>{item.buyer_email}</span>
    //                 <span className={styles}>{item.buyer_phone}</span>
    //                 {item.products.map(product => (
    //                     <div className={styles}>
    //                         <p className={styles}>{product.product_name}</p>
    //                         <span className={styles}>{product.product_price}</span>
    //                         <img className={styles} src={`${baseUrl}${product.product_image}`} />
    //                         <span className={styles}>{product.quantity}</span>
    //                     </div>
    //                 ))}
    //             </li>
    //         ))}
    //     </ul>
    // );

    return (
        <ul className={styles.orderList}>
            {orders.map(item => (
                <li className={styles.orderItem} key={item.id}>
                    <p className={styles.buyerName}>{item.buyer_name}</p>
                    <span className={styles.buyerEmail}>{item.buyer_email}</span>
                    <span className={styles.buyerPhone}>{item.buyer_phone}</span>
                    {item.products.map(product => (
                        <div className={styles.product} key={product.id}>
                            <p className={styles.productName}>{product.product_name}</p>
                            <span className={styles.productPrice}>{product.product_price}</span>
                            <img className={styles.productImage} src={`${baseUrl}${product.product_image}`} alt={product.product_name} />
                            <span className={styles.productQuantity}>{product.quantity}</span>
                        </div>
                    ))}
                </li>
            ))}
        </ul>
    );
}

export default OrderList;
