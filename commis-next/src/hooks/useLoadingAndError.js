import React from 'react';
import Loading from '../components/Loading/Loading';
import ErrorDisplay from '../components/ErrorDisplay/ErrorDisplay';

const useLoadingAndError = (loading, error) => {
    if (loading) return <Loading />;
    if (error) return <ErrorDisplay error={error} />;
    return null;
};

export default useLoadingAndError;