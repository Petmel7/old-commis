
import { useState } from 'react';
import { searchProducts } from '@/services/products';
import CloseIcon from '../../../public/img/close.svg';
import styles from './styles/Header.module.css';

const SearchMenu = ({ isMenuOpen, handleCloseClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const results = await fetchSearchResults(query);
            console.log('handleInputChange->results', results);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const fetchSearchResults = async (query) => {
        try {
            const response = await searchProducts(query);
            console.log('fetchSearchResults->response', response);
            return response.products || [];
        } catch (error) {
            console.error('Помилка при виконанні пошуку:', error);
            return [];
        }
    };

    return (
        <div className={`${styles.searchMenu} ${isMenuOpen ? styles.searchMenuOpen : ''}`}>
            <button className={styles.closeButton} onClick={handleCloseClick}>
                <CloseIcon />
            </button>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Пошук..."
                value={searchQuery}
                onChange={handleInputChange}
            />

            {Array.isArray(searchResults) && searchResults.length > 0 && (
                <ul className={styles.searchResults}>
                    {searchResults.map((product) => (
                        <li key={product.id} className={styles.searchResultItem}>
                            <a href={`/products/details/${product.id}`}>
                                {product.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchMenu;