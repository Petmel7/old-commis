import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddPhoneNumber = () => {
    const [phone, setPhone] = useState('');
    const router = useRouter();

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPhone({ phone });
            router.push('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className={styles.authForm} onSubmit={handlePhoneSubmit}>
            <h2 className={styles.authHeading}>Введіть свій номер телефону</h2>
            <input className={styles.authInput} type="number" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон" />
            <button type='submit'>Додати</button>
        </form >
    )
}