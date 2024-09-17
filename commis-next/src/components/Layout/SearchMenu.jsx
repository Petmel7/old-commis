
import { useState } from 'react';
import { searchProducts } from '@/services/products';
import Menu from '../Menu/Menu';
import styles from './styles/SearchMenu.module.css';

const SearchMenu = ({ isOpen, handleCloseClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const results = await fetchSearchResults(query);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const fetchSearchResults = async (query) => {
        try {
            const response = await searchProducts(query);
            return response.products || [];
        } catch (error) {
            console.error('Помилка при виконанні пошуку:', error);
            return [];
        }
    };

    return (
        <Menu isOpen={isOpen} handleCloseClick={handleCloseClick}>
            <div className={styles.searchContainer}>
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
        </Menu>
    );
};

export default SearchMenu;

