import React from 'react';
import Logout from '../components/User/Logout';
import AddProduct from '../components/Product/AddProduct';

function ProfilePage() {
    return (
        <>
            <div>Profile</div>
            <AddProduct />
            <Logout />
        </>
    )
}

export default ProfilePage;