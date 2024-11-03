// src/app/components/Pokemon/PokemonCard.js
"use client";
import { useFavorite } from "@/contexts/FavoriteContext";
import styles from "./PokemonCard.module.css";

export default function PokemonCard({ pokemon }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();

  // Handle case where pokemon is undefined
  if (!pokemon) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  const isFav = isFavorite(pokemon.id);

  function handleFavoriteClick() {
    if (isFav) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  }

  return (
    <div className={styles.card}>
      <h2 >{pokemon.name}</h2>
      <img src={pokemon.img} alt={pokemon.name} />
      <button onClick={handleFavoriteClick}>
        {isFav ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
