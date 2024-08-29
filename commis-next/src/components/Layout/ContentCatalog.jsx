import Link from "next/link";
import Menu from "../Menu/Menu";

const ContentCatalog = ({ isOpen, handleCloseClick }) => {
    return (
        <Menu isOpen={isOpen} handleCloseClick={handleCloseClick}>
            <h3>Каталог</h3>
            <ul>
                <li>
                    <Link href="/clothing">
                        <p>Одяг</p>
                    </Link>
                </li>
                <li>
                    <Link href="/accessories">
                        <p>Аксисуари</p>
                    </Link>
                </li>
                <li>
                    <Link href="/souvenirs">
                        <p>Сувеніри</p>
                    </Link>
                </li>
                <li>
                    <Link href="/office">
                        <p>Канцелярія</p>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <p>Весь каталог</p>
                    </Link>
                </li>
            </ul>
        </Menu>
    )
}

export default ContentCatalog;