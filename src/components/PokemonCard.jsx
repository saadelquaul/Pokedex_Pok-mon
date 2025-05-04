import React from 'react';
import { Link } from 'react-router-dom';
import { getTypeColor } from '../types/pokemon';

const PokemonCard = ({ pokemon }) => {
  const mainType = pokemon.types[0].type.name;
  const mainColor = getTypeColor(mainType);
  
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block transition-all duration-300 hover:-translate-y-2 h-full">
      <div className="h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-200 bg-white">
        {/* Card Header with Gradient Background */}
        <div 
          className="p-6 relative"
          style={{ 
            background: `linear-gradient(135deg, ${mainColor}20 0%, ${mainColor}40 100%)`,
          }}
        >
          {/* Pokemon ID Badge */}
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700 shadow-sm">
            #{String(pokemon.id).padStart(3, '0')}
          </div>
          
          {/* Pokemon Image with Subtle Shadow */}
          <div className="flex justify-center">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-36 object-contain mx-auto drop-shadow-lg transform transition-transform hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-4">
          {/* Pokemon Name */}
          <h2 className="font-bold text-lg capitalize mb-3 text-gray-800 tracking-wide">
            {pokemon.name.replace('-', ' ')}
          </h2>
          
          {/* Pokemon Types */}
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className="px-3 py-1 text-xs font-medium text-white rounded-full capitalize shadow-sm"
                style={{ 
                  backgroundColor: getTypeColor(typeInfo.type.name),
                  textShadow: '0 1px 1px rgba(0,0,0,0.2)'
                }}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;