import { useState } from "react";
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim().toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className={`flex items-center bg-white rounded-full shadow-md transition-all duration-300 ${isFocused ? 'shadow-lg ring-2 ring-red-400 ring-opacity-50' : 'hover:shadow-lg'}`}>
        {/* Pokeball Icon */}
        <div className="pl-4">
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 bg-red-500 rounded-full"></div>
            <div className="absolute inset-0 bg-white rounded-full" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)' }}></div>
            <div className="absolute inset-[30%] bg-white rounded-full border-2 border-gray-300"></div>
          </div>
        </div>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 py-3 px-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          aria-label="Search Pokémon"
        />
        
        {/* Search Button */}
        <button 
          type="submit" 
          className="bg-gradient-to-r from-red-600 to-red-500 text-white font-medium py-3 px-6 rounded-r-full hover:from-red-700 hover:to-red-600 transition-all duration-300 flex items-center"
        >
          <Search className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;