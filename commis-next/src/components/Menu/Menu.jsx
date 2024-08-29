
import styles from './styles/Menu.module.css';
import CloseIcon from '../../../public/img/close.svg';

const Menu = ({ isOpen, handleCloseClick, children }) => {
    console.log('Menu->isOpen', isOpen);

    return (
        <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
            <button className={styles.closeButton} onClick={handleCloseClick}>
                <CloseIcon />
            </button>
            {children}
        </div>
    );
};

export default Menu;

