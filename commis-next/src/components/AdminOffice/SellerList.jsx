import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import sellerDataList from "./sellers/sellerDataList";

const componentMap = {
    'active': dynamic(() => import('./sellers/ActiveSellers')),
    'new-ones': dynamic(() => import('./sellers/NewSellers')),
    'blocked': dynamic(() => import('./sellers/BlockedSellers')),
}

const SellerList = () => {
    const router = useRouter();
    const { slug } = router.query;

    // const sellerData = sellerDataList.find(seller => seller.slug === slug);

    const ComponentToRender = componentMap[slug];

    return (
        <>
            <div>
                {/* {sellerData.title} */}
            </div>
            {ComponentToRender ? <ComponentToRender /> : ''}
        </>
    )
}

export default SellerList;