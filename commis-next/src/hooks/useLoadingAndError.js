// import React from 'react';
// import Loading from '../components/Loading/Loading';
// import ErrorDisplay from '../components/ErrorDisplay/ErrorDisplay';

// const useLoadingAndError = (loading, error) => {
//     if (loading) return <Loading />;
//     if (error) return <ErrorDisplay error={error} />;
//     return null;
// };

// export default useLoadingAndError;

import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading/Loading';
import ErrorDisplay from '../components/ErrorDisplay/ErrorDisplay';

const useLoadingAndError = (loading, error) => {
    const [showDelayAlert, setShowDelayAlert] = useState(false);

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => {
                setShowDelayAlert(true);
            }, 5000);
        } else {
            clearTimeout(timer);
            setShowDelayAlert(false);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    if (showDelayAlert) {
        alert('У зв\u044fзку з безкоштовним хостингом перше завантаження може тривати довше. Зачекайте, будь ласка.');
    }

    if (loading) return <Loading />;
    if (error) return <ErrorDisplay error={error} />;
    return null;
};

export default useLoadingAndError;
