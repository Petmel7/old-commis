
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import adminDataList from './adminDatalList';

const componentMap = {
    'dashboard': dynamic(() => import('./Dashboard')),
    'users': dynamic(() => import('./UsersManagement')),
    'seller-management': dynamic(() => import('./SellersManagement')),
};

const AdminOfficeList = () => {
    const router = useRouter();
    const { slug } = router.query;

    const pageData = adminDataList.find(item => item.slug === slug);
    if (!pageData) return <p>Сторінка не знайдена</p>;

    const ComponentToRender = componentMap[slug];

    return (
        <>
            <div>
                <h3>{pageData.title}</h3>
            </div>
            {ComponentToRender ? <ComponentToRender /> : <p>Компонент для цієї сторінки ще не доданий.</p>}
        </>
    );
};

export default AdminOfficeList;

