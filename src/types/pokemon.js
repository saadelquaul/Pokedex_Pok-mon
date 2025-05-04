// pokemonData.js

// Function to get the type color
export const getTypeColor = (type) => {
  const typeMap = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  return typeMap[type] || '#777777';
};

// Example of Pokémon list response
export const pokemonListResponse = {
  count: 100,
  next: 'next-url',
  previous: 'prev-url',
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ]
};

// Example of Pokémon detail
export const pokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: {
    front_default: 'front-image-url',
    back_default: 'back-image-url',
    front_shiny: 'front-shiny-image-url',
    back_shiny: 'back-shiny-image-url',
    other: {
      'official-artwork': {
        front_default: 'official-artwork-url',
      },
      home: {
        front_default: 'home-image-url',
      },
    },
  },
  types: [
    { slot: 1, type: { name: 'grass', url: 'url' } },
    { slot: 2, type: { name: 'poison', url: 'url' } },
  ],
  abilities: [
    { ability: { name: 'chlorophyll', url: 'url' }, is_hidden: false, slot: 1 },
    { ability: { name: 'overgrow', url: 'url' }, is_hidden: false, slot: 2 },
  ],
  stats: [
    { base_stat: 45, effort: 0, stat: { name: 'hp', url: 'url' } },
    { base_stat: 49, effort: 0, stat: { name: 'attack', url: 'url' } },
  ],
  moves: [
    { move: { name: 'tackle', url: 'url' } },
    { move: { name: 'vine-whip', url: 'url' } },
  ],
  species: { name: 'bulbasaur', url: 'url' },
};

// Example of Pokémon species
export const pokemonSpecies = {
  flavor_text_entries: [
    { flavor_text: 'A strange seed was planted on its back at birth.', language: { name: 'en' } },
  ],
  evolution_chain: { url: 'evolution-chain-url' },
};

// Example of evolution chain
export const evolutionChain = {
  chain: {
    species: { name: 'bulbasaur', url: 'bulbasaur-url' },
    evolves_to: [
      {
        species: { name: 'ivysaur', url: 'ivysaur-url' },
        evolves_to: [
          { species: { name: 'venusaur', url: 'venusaur-url' }, evolves_to: [] },
        ],
      },
    ],
  },
};
