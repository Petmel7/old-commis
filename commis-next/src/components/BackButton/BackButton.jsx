import { useRouter } from "next/router";
import BackIcon from '../../../public/img/back.svg';
import styles from './styles/BackButton.module.css';

const BackButton = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

    return (
        <button className={styles.backButton} onClick={handleBack}>
            <BackIcon />
        </button>
    )
}

export default BackButton;