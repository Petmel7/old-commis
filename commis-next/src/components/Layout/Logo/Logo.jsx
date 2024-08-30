import Link from "next/link"
import styles from './styles/Logo.module.css';

const Logo = () => (
    <div>
        <Link href="/" className={styles.logo}>Commis</Link>
    </div>
)

export default Logo;