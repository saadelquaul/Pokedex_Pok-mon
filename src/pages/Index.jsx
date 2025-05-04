import { useState } from "react";
import SearchBar from "../components/SearchBar";
import PokemonList from "../components/PokemonList";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-gray-50">
      {/* Decorative Pokeball Background Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full border-8 border-red-500 opacity-5 -z-10"></div>
      <div className="absolute top-60 right-20 w-60 h-60 rounded-full border-8 border-red-500 opacity-5 -z-10"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full border-4 border-red-500 opacity-5 -z-10"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png')] bg-repeat opacity-10"></div>
        <div className="container mx-auto py-16 px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
              Pokédex
              <span className="inline-block ml-2 transform -rotate-12">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                  alt="Pokeball" 
                  className="w-10 h-10 inline"
                />
              </span>
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
              Explore the world of Pokémon through our comprehensive Pokédex. 
              Search for your favorite Pokémon by name or browse through the catalog.
            </p>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Find Your Pokémon</h2>
            <SearchBar onSearch={setSearchQuery} />
        </div>
        
        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {searchQuery ? `Results for "${searchQuery}"` : "All Pokémon"}
            </h2>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear search
              </button>
            )}
          </div>
          
          <PokemonList searchQuery={searchQuery} />
        </div>
        
        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12">
          <p>Data provided by <a href="https://pokeapi.co/" className="text-red-600 hover:underline">PokéAPI</a></p>
          <p className="mt-2">Pokémon and Pokémon character names are trademarks of Nintendo.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;