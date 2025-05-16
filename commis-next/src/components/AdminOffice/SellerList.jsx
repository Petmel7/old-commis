import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const componentMap = {
    'active': dynamic(() => import('./sellers/ActiveSellers')),
    'new-ones': dynamic(() => import('./sellers/NewSellers')),
    'blocked': dynamic(() => import('./sellers/BlockedSellers')),
    'statistics': dynamic(() => import('./sellers/StatisticsSellers')),
}

const SellerList = () => {
    const router = useRouter();
    const { slug } = router.query;

    const ComponentToRender = componentMap[slug];

    return (
        <>
            {ComponentToRender ? <ComponentToRender /> : ''}
        </>
    )
}

export default SellerList;