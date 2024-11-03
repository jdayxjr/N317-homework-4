"use client";
import { useState } from "react";
import pokeStyles from "./search.module.css";

export default function PokemonPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    function changeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    async function searchForPokemon() {
        if (!searchTerm) return;

        setErrorMessage(""); // Clear any previous errors
        setPokemonData(null); // Clear previous results

        try {
            // Try searching by Pokémon name first
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
            if (response.ok) {
                const data = await response.json();
                setPokemonData({
                    type: "pokemon",
                    name: data.name,
                    img: data.sprites.front_default,
                    id: data.id,
                });
                return;
            }

            // If not found by name, try searching by egg group
            response = await fetch(`https://pokeapi.co/api/v2/egg-group/${searchTerm.toLowerCase()}`);
            if (response.ok) {
                const data = await response.json();
                setPokemonData({
                    type: "egg-group",
                    name: data.name,
                    species: data.pokemon_species,
                });
                return;
            }

            // If not found by egg group, try searching by habitat
            response = await fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${searchTerm.toLowerCase()}`);
            if (response.ok) {
                const data = await response.json();
                setPokemonData({
                    type: "habitat",
                    name: data.name,
                    pokemon: data.pokemon_species,
                });
                return;
            }

            // If nothing was found, set an error
            setErrorMessage("No Pokémon, egg group, or habitat found with that name.");
        } catch (error) {
            setErrorMessage("An error occurred while searching. Please try again.");
        }
    }

    return (
        <main className={pokeStyles.main}>
            <h1>Pokemon Search</h1>
            <div className={pokeStyles.search}>
                <input
                    type="search"
                    value={searchTerm}
                    onChange={changeSearchTerm}
                    placeholder="Search by name, egg group, or habitat"
                />
                <button onClick={searchForPokemon}>Search</button>
            </div>

            {/* Display Results */}
            {errorMessage && <p>{errorMessage}</p>}

            {pokemonData && pokemonData.type === "pokemon" && (
                <div>
                    <h3>{pokemonData.name}</h3>
                    <img src={pokemonData.img} alt={pokemonData.name} />
                    <p>ID: {pokemonData.id}</p>
                </div>
            )}

            {pokemonData && pokemonData.type === "egg-group" && (
                <div>
                    <h3>Egg Group: {pokemonData.name}</h3>
                    <ul>
                        {pokemonData.species.map((species) => (
                            <li key={species.name}>{species.name}</li>
                        ))}
                    </ul>
                </div>
            )}

            {pokemonData && pokemonData.type === "habitat" && (
                <div>
                    <h3>Habitat: {pokemonData.name}</h3>
                    <ul>
                        {pokemonData.pokemon.map((species) => (
                            <li key={species.name}>{species.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </main>
    );
}