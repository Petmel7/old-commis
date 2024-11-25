import { blockUser, blockProduct } from "@/services/admin";
import useToggleBlock from "@/hooks/useToggleBlock";
import styles from './styles/BlockedButton.module.css';

const BlockedButton = ({ id, isBlocked, onStatusChange, type }) => {

    const blockFunction = type === 'user' ? blockUser : blockProduct;
    const showClass = type !== 'user' ? styles.blockedButton : '';
    const buttonClass = isBlocked ? styles.reslategreyButton : styles.blackButton;

    const { loading, toggleBlockStatus } = useToggleBlock(blockFunction, id, isBlocked, onStatusChange);

    return (
        <button className={`${buttonClass} ${showClass}`} onClick={toggleBlockStatus} disabled={loading}>
            {isBlocked ? 'Розблокувати' : 'Заблокувати'}
        </button>
    );
};

export default BlockedButton;