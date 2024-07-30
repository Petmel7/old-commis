import Link from 'next/link';
import styles from '../styles/Page404.module.css';

const Page404 = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Вибачте, сторінку не знайдено.</p>
            <Link href="/">
                <p className={styles.homeLink}>Повернутися на головну</p>
            </Link>
        </div>
    );
}

export default Page404;
