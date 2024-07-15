import React from 'react';
import AddProduct from '../components/Product/AddProduct';
import UserProducts from '../components/Product/UserProducts';

function ProfilePage() {
    return (
        <>
            <AddProduct />
            <UserProducts />
        </>
    )
}

export default ProfilePage;