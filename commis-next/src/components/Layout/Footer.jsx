
import NavIcons from "./NavIcons";
import styles from './styles/Footer.module.css';

const Footer = () => (
    <footer className={styles.footer}>
        <div className="mobile-only">
            <NavIcons />
        </div>
    </footer>
);

export default Footer;