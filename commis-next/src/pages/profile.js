import React from 'react';
import Link from 'next/link';
import Profile from '../components/Profile/Profile';


function ProfilePage() {
    return (
        <>
            {/* <Profile /> */}
            <ul>
                <li>
                    <Link href='/product'>Додати продукт</Link>
                </li>
                <li>
                    <Link href='/myProducts'>Мої продукти</Link>
                </li>
                <li>
                    <Link href='/orders'>Замовлення</Link>
                </li>
            </ul>
        </>
    )
}

export default ProfilePage;