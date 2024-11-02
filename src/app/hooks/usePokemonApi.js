"use client";
import { createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
    const [pokemonState, setPokemonState] = useState({
        totalPokemonCount: 0,
        randomPokemon: [],
    });

    async function getNumberOfPokemon() {
        const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1`);
        const { count: pokemonCount } = await pokeResponse.json();
        setPokemonState((prev) => ({ ...prev, totalPokemonCount: pokemonCount }));
    }

    async function getPokemonQuickInfo(pokeData) {
        return {
            name: pokeData.name,
            id: pokeData.id,
            img: pokeData.sprites.front_default,
            types: pokeData.types,
        };
    }

    const pokemonValues = {
        ...pokemonState,
        getNumberOfPokemon,
        getPokemonQuickInfo,
    };

    return (
        <PokemonContext.Provider value={pokemonValues}>
            {children}
        </PokemonContext.Provider>
    );
}

export default function usePokemonApi() {
    return useContext(PokemonContext);
}