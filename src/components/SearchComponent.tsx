"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const placeholders = [
    "Search for a business",
    "Nail Salons",
    "Restaurants",
    "Software Developer",
    "Spas",
  ];
  const handleSearch = () => {
    // Encode the search term to pass it as a URL parameter
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    // Navigate to the search results page with the encoded search term as query parameter
    window.location.href = `/search?query=${encodedSearchTerm}`;
  };

  return (
    <>
      <div className="w-full my-4">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onSubmit={handleSearch}
        />
      </div>
    </>
  );
};

export default SearchComponent;
