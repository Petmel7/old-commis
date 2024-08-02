import React from 'react';
import Link from 'next/link';

const Navbar = () => (
    <nav>
        <Link href="/">Головна</Link>
        <Link href="/profile">Профіль</Link>
        <Link href="/add-product">Додати товар</Link>
        <Link href="/orders">Мої замовлення</Link>
    </nav>
);

export default Navbar;