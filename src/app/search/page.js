"use client";

import { useState, useEffect } from "react";
import { usePokemonApi } from "../hooks/usePokemonApi";
import SearchBar from "../search/page"; // Updated import for SearchBar component
import searchStyles from "../styles/search.module.css"; // Adjust the path based on your structure

export default function PokemonSearch() {
    const [pokemon, setPokemon] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const { getPokemonQuickInfo, getNumberOfPokemon } = usePokemonApi();

    useEffect(() => {
        const fetchData = async () => {
            await getNumberOfPokemon(); // Fetch total Pokémon count on load
        };
        fetchData();
    }, [getNumberOfPokemon]);

    async function searchForPokemonByName(name) {
        setErrorMessage("");
        try {
            const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            if (!rawData.ok) throw new Error("Pokemon not found");
            const pokeDataFormatted = await rawData.json();
            const quickInfo = getPokemonQuickInfo(pokeDataFormatted);
            setPokemon(quickInfo);
        } catch (error) {
            setPokemon({});
            setErrorMessage("Pokemon not found");
        }
    }

    return (
        <PokemonProvider>
            <main>
                <div className={searchStyles.container}>
                    <h1 className={searchStyles.title}>Find Your Pokémon</h1>
                    <SearchBar onSearch={searchForPokemonByName} /> {/* Use the SearchBar component */}
                    <div className={searchStyles.search}>
                        {pokemon.name && <h3>{pokemon.name}</h3>}
                        {errorMessage && <p>{errorMessage}</p>}
                        {pokemon.img && <img src={pokemon.img} alt={pokemon.name} />}
                    </div>
                </div>
            </main>
        </PokemonProvider>
    );
}