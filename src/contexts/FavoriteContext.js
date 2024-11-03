// src/contexts/FavoriteContext.js
"use client"; // This marks the file as a client component
import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    function addFavorite(pokemon) {
        // Check if the Pokémon is already in favorites
        if (!favorites.some(fav => fav.id === pokemon.id)) {
            setFavorites(prevFavorites => [...prevFavorites, pokemon]);
        }
    }

    function removeFavorite(id) {
        setFavorites(prevFavorites => prevFavorites.filter(pokemon => pokemon.id !== id));
    }

    function isFavorite(id) {
        return favorites.some(pokemon => pokemon.id === id);
    }

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
}

export function useFavorite() {
    return useContext(FavoriteContext);
}