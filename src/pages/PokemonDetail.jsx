import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTypeColor } from "../types/pokemon";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Scale, Ruler, Zap } from 'lucide-react';
import LoadingSpinner from "../components/LoadingSpinner";

const PokemonDetail = () => {
  const { id } = useParams();
  const pokemonId = Number(id);

  // Fetch Pokémon details
  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!response.ok) throw new Error('Failed to fetch Pokémon details');
      return response.json();
    }
  });

  // Fetch Pokémon species information for description
  const { data: species, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ['species', pokemon?.species.url],
    enabled: !!pokemon?.species.url,
    queryFn: async () => {
      const response = await fetch(pokemon.species.url);
      if (!response.ok) throw new Error('Failed to fetch species details');
      return response.json();
    }
  });

  const isLoading = isLoadingPokemon || isLoadingSpecies;

  // Get English description
  const description = species?.flavor_text_entries
    .find(entry => entry.language.name === "en")?.flavor_text
    .replace(/\f/g, ' ') || "No description available.";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-gray-50 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-gray-50 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-4 opacity-30">
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
              alt="Pokeball" 
              className="w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Pokémon Not Found</h2>
          <p className="mb-6 text-gray-600">We couldn't find the Pokémon you're looking for.</p>
          <Link to="/">
            <button className="bg-gradient-to-r from-red-600 to-red-500 text-white font-medium py-2 px-6 rounded-full hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-md">
              Return to Pokédex
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Get main type for theming
  const mainType = pokemon.types[0].type.name;
  const mainColor = getTypeColor(mainType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      {/* Navigation Bar */}
      <div className="container max-w-5xl px-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 font-medium">
              <ArrowLeft size={18} />
              <span>Back to Pokédex</span>
            </button>
          </Link>

          <div className="flex gap-2">
            {pokemonId > 1 && (
              <Link to={`/pokemon/${pokemonId - 1}`}>
                <button className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>
              </Link>
            )}
            <Link to={`/pokemon/${pokemonId + 1}`}>
              <button className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </Link>
          </div>
        </div>

        {/* Main Pokemon Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Header with Pokemon Type Color */}
          <div 
            className="h-4 w-full"
            style={{ backgroundColor: mainColor }}
          ></div>
          
          {/* Pokemon Info Section */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center">
              {/* Pokemon Image Section */}
              <div className="md:w-2/5 mb-8 md:mb-0 relative">
                <div 
                  className="absolute inset-0 rounded-full opacity-10 transform scale-90"
                  style={{ backgroundColor: mainColor }}
                ></div>
                <div className="relative z-10 transform transition-transform duration-500 hover:scale-105">
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full max-w-xs mx-auto drop-shadow-xl"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md">
                  <div className="text-sm font-bold text-gray-500">
                    #{String(pokemon.id).padStart(3, '0')}
                  </div>
                </div>
              </div>
              
              {/* Pokemon Details Section */}
              <div className="md:w-3/5 md:pl-10">
                <h1 className="text-4xl font-extrabold capitalize mb-3 text-gray-800 tracking-wide text-center md:text-left">
                  {pokemon.name.replace('-', ' ')}
                </h1>
                
                {/* Types */}
                <div className="flex gap-2 mb-6 justify-center md:justify-start">
                  {pokemon.types.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className="px-4 py-1.5 text-sm font-semibold text-white rounded-full capitalize shadow-sm"
                      style={{ 
                        backgroundColor: getTypeColor(typeInfo.type.name),
                        textShadow: '0 1px 1px rgba(0,0,0,0.2)'
                      }}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>
                
                {/* Description */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Pokédex Entry</h3>
                  <p className="text-gray-700 leading-relaxed italic">"{description}"</p>
                </div>
                
                {/* Physical Attributes */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                    <Scale className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Weight</div>
                      <div className="font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                    <Ruler className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Height</div>
                      <div className="font-semibold">{(pokemon.height / 10).toFixed(1)} m</div>
                    </div>
                  </div>
                </div>
                
                {/* Abilities */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Abilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability) => (
                      <div
                        key={ability.ability.name}
                        className={`px-4 py-2 text-sm rounded-lg ${
                          ability.is_hidden 
                            ? 'bg-gray-100 text-gray-600 border border-gray-200' 
                            : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white'
                        }`}
                      >
                        <div className="flex items-center">
                          {!ability.is_hidden && <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />}
                          <span className="capitalize">{ability.ability.name.replace('-', ' ')}</span>
                          {ability.is_hidden && <span className="ml-1.5 text-xs opacity-75">(Hidden)</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="p-8 bg-gray-50 border-t border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Base Stats</h3>
            
            {/* Additional Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-sm text-gray-500 mb-1">Base Experience</div>
                <div className="text-xl font-bold">{pokemon.base_experience || 'N/A'}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-sm text-gray-500 mb-1">Base Happiness</div>
                <div className="text-xl font-bold">{species?.base_happiness || 'N/A'}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-sm text-gray-500 mb-1">Capture Rate</div>
                <div className="text-xl font-bold">{species?.capture_rate || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Data provided by <a href="https://pokeapi.co/" className="text-red-600 hover:underline">PokéAPI</a></p>
          <p className="mt-1">Pokémon and Pokémon character names are trademarks of Nintendo.</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;