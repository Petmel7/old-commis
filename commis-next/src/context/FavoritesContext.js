
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchFavorites } from '@/utils/fetchFavorites';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        const response = await fetchFavorites();
        setFavorites(response);
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const saveFavorite = (favorite) => {
        setFavorites((prevFavorites) => [...prevFavorites, favorite]);
    };

    const removeFavorite = (favoriteId) => {
        setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== favoriteId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, saveFavorite, removeFavorite, loadFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
