
import Link from "next/link";
import NavIcons from "./NavIcons";
import Logo from "./Logo/Logo";
import styles from './styles/Footer.module.css';
import Facebook from '../../../public/img/facebook.svg';
import Instagram from '../../../public/img/instagram.svg';
import Viber from '../../../public/img/viber.svg';


const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
            <div className="mobile-only">
                <NavIcons />
            </div>

            <div className={`${styles.desktopFooter} desktop-only`}>
                <div className={styles.desctopContainer}>
                    <Logo />
                    <div className={styles.contactInfo}>
                        <p>Телефон: +380 (XX) XXX-XX-XX</p>
                        <p>Пошта: info@example.com</p>
                    </div>

                    <div className={styles.socialMedia}>
                        <a className={styles.facebook} href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <Facebook />
                        </a>
                        <a className={styles.instagram} href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram />
                        </a>
                        <a className={styles.viber} href="https://www.viber.com" target="_blank" rel="noopener noreferrer">
                            <Viber />
                        </a>
                    </div>
                </div>

                <div className={styles.policiesContainer}>
                    <div className={styles.rightsReserved}>
                        <p>© 2024 Всі права захищені</p>
                    </div>

                    <div className={styles.policies}>
                        <Link href="/data-policy">Політика обробки даних</Link>
                        <Link href="/privacy-policy">Політика конфіденційності</Link>
                    </div>

                    <div className={styles.policies}>
                        <Link href="/mobile-version">Мобільна версія</Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;