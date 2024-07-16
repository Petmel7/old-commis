import React from 'react';
import Link from 'next/link';

function ProfilePage() {
    return (
        <ul>
            <li>
                <Link href='/product'>Додати продукт</Link>
            </li>
            <li>
                <Link href='/myProducts'>Мої продукти</Link>
            </li>
            <li>
                <Link href='/oder'>Замовлення</Link>
            </li>
        </ul>
    )
}

export default ProfilePage;