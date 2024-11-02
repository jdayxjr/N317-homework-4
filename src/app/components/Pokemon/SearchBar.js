// src/components/pokemon/SearchBar.js
"use client";

import { useState } from "react";
import searchStyles from "@/styles/search.module.css"; // Adjust the path based on your structure

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setQuery(""); // Clear the input after search
        }
    };

    return (
        <form onSubmit={handleSearch} className={searchStyles.searchForm}>
            <input
                type="text"
                placeholder="Search for a Pokémon..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={searchStyles.searchInput}
            />
            <button type="submit" className={searchStyles.searchButton}>
                Search
            </button>
        </form>
    );
}