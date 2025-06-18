export const getProfileLinks = (userId, role) => {
    const links = [
        {
            href: '/productAdd',
            text: 'Додати продукт',
            tooltip: 'Тут ви можете додати продукт',
        },
        {
            href: '/userProducts',
            text: 'Мої продукти',
            tooltip: 'Тут знаходяться всі додані ваші продукти',
        },
        {
            href: '/orderList',
            text: 'Замовлення',
            tooltip: 'Тут знаходяться замовлення ваших продуктів',
        },
        {
            href: `admin/user-details/${userId}`,
            text: 'Редагувати профіль',
            tooltip: 'Тут ви можете редагувати свій профіль',
        },
    ];

    if (role === 'superadmin') {
        links.push({
            href: '/adminOffice',
            text: 'Кабінет адміністратора',
            tooltip: 'Кабінет адміністратора',
        });
    }

    return links;
};
