
import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/oder'

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity } = useCart();

    const handleOrder = async () => {
        try {
            const response = await createOrder({ items: cart });
            console.log('handleOrder->response.message', response.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Корзина</h1>
            {cart.map(item => (
                <div key={item.product_id}>
                    <p>{item.name}</p>
                    <button onClick={() => increaseQuantity(item.product_id)}>+</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => decreaseQuantity(item.product_id)}>-</button>
                </div>
            ))}
            <Link href="/"><button>Продовжити покупки</button></Link>
            <button onClick={handleOrder}>Продовжити замовлення</button>
        </div>
    );
};

export default Cart;
