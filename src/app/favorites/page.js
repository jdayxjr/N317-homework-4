// src/app/favorites/page.js
"use client";
import { useFavorite } from "@/contexts/FavoriteContext";
import PokemonCard from "@/app/components/Pokemon/PokemonCard";
import styles from "./favorites.module.css";

export default function FavoritesPage() {
    const { favorites } = useFavorite(); // Access favorites from context

    return (
        <main className={styles.mainContent}>
            <h1>Your Favorite Pokémon</h1>
            <div className={styles.favoriteList}>
                {favorites && favorites.length > 0 ? (
                    favorites.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                ) : (
                    <p>No favorites found!</p>
                )}
            </div>
        </main>
    );
}
