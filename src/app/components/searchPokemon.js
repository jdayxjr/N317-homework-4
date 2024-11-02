"use client";

import { useState } from "react";
import searchStyles from "@/app/components/search.module.css";

export default function PokemonSearch() {
    const [pokemon, setPokemon] = useState({ sprites: {}, species: {} });
    const [searchTerm, setSearchTerm] = useState("");



    function changeSearchTerm(e) {
        setSearchTerm(e.currentTarget.value.toLowerCase());
    }

    async function searchForPokemonByName() {
        try {
            const rawData = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
            );
            if (!rawData.ok) throw new Error("Pokemon not found");
            const pokeDataFormatted = await rawData.json();
            setPokemon(pokeDataFormatted);





            setPokemon(pokeDataFormatted);
        } catch (error) {
            setPokemon({ name: searchTerm, sprites: {} });
        }
    }

    return (
        <main>
            <div className={searchStyles.search}>
                <input
                    type="search"
                    id="search"
                    name="search"
                    value={searchTerm}
                    onChange={changeSearchTerm}
                />
                <input type="button" value="Search" onClick={searchForPokemonByName} />
            </div>
            <h3>{pokemon.name}</h3>
            {pokemon.sprites.front_default && (
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            )}


        </main>
    );
}