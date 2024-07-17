
import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/order';

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity } = useCart();
    console.log('Cart->cart', cart);
    const handleOrder = async () => {
        // Формування масиву об'єктів для замовлення на основі вмісту корзини
        const items = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        console.log('Cart->items', items);

        try {
            const response = await createOrder({ items });
            console.log('Cart->response', response);
            console.log('handleOrder->response.message', response.message);
        } catch (error) {
            console.error('handleOrder->error', error);
        }
    };

    return (
        <div>
            <h1>Корзина</h1>
            {cart.map(item => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                </div>
            ))}
            <Link href="/"><button>Продовжити покупки</button></Link>
            <button onClick={handleOrder}>Продовжити замовлення</button>
        </div>
    );
};

export default Cart;

