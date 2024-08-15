import Link from 'next/link';
import Rabbit from '../../../public/jpg/unnamed.jpg';
import styles from './styles/NoSelectedProducts.module.css';

const NoSelectedProducts = () => (
    <div className={styles.container}>
        <img className={styles.image} src={Rabbit.src} alt="Hемає вибраних продуктів" />
        <p className={styles.text}>Hемає вибраних продуктів</p>
        <Link href={'/'}>
            <button className={styles.button}>Вибрати</button>
        </Link>
    </div>
)

export default NoSelectedProducts;
