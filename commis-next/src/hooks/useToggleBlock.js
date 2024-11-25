
import { useState } from "react";

const useToggleBlock = (functionBlock, id, isBlocked, onStatusChange) => {
    const [loading, setLoading] = useState(false);

    const toggleBlockStatus = async () => {
        setLoading(true);
        try {
            const response = await functionBlock(id, isBlocked);
            onStatusChange(response.user || response.product);
        } catch (error) {
            console.error("Помилка блокування:", error);
        } finally {
            setLoading(false);
        }
    };
    return { loading, setLoading, toggleBlockStatus };
}

export default useToggleBlock;