import Link from 'next/link';
import Rabbit from '../../../public/jpg/unnamed.jpg';
import BackButton from '../BackButton/BackButton';
import styles from './styles/NoProducts.module.css';

const NoProducts = ({ text, buttonLink, buttonText }) => {
    return (
        <>
            <BackButton />
            <div className={styles.container}>
                <img className={styles.image} src={Rabbit.src} alt="Hемає вибраних продуктів" />
                <p className={styles.text}>{text}</p>
                {buttonLink && buttonText && (
                    <Link href={buttonLink}>
                        <button>{buttonText}</button>
                    </Link>
                )}
            </div>
        </>
    )
}
export default NoProducts;