"use client";
import usePokemonApi from "@/app/hooks/usePokemonApi";
import { useEffect } from "react";
import homeStyles from "./page.module.css";
import PokemonCard from "@/app/components/Pokemon/PokemonCard";

export default function Home() {
  const pokeData = usePokemonApi();

  useEffect(() => {
    if (pokeData.totalPokemonCount === 0) {
      pokeData.getNumberOfPokemon();
    }
    if (!pokeData.randomPokemon.length) {
      pokeData.getRandomPokemon(5); // Fetch 5 random Pokémon
    }
  }, [pokeData]);

  const randomPokemonListJsx = pokeData.randomPokemon.map((pokemon) => {
    const quickInfo = pokeData.getPokemonQuickInfo(pokemon);
    return (
      <PokemonCard
        key={`poke-card-${quickInfo.id}`}
        pokemon={quickInfo} // Pass the entire object instead of separate props
      />
    );
  });

  return (
    <main className={homeStyles.mainContent}>
      <div className={homeStyles.homePageHeader}></div>
      <section>{randomPokemonListJsx.length > 0 ? randomPokemonListJsx : <p>Loading Pokémon...</p>}</section>
    </main>
  );
}
