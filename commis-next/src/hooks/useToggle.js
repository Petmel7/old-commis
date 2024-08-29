import { useState } from 'react';

const useToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenClick = () => {
        setIsOpen(true);
    };

    const handleCloseClick = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        handleOpenClick,
        handleCloseClick
    };
};

export default useToggle;