import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PokemonCard from './PokemonCard';
import LoadingSpinner from './LoadingSpinner';

const ITEMS_PER_PAGE = 20;

const PokemonList = ({ searchQuery }) => {
    const [page, setPage] = useState(1);

    const { data: pokemonListData, isLoading: isLoadingList } = useQuery({
        queryKey: ['pokemonList'],
        queryFn: async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
            if (!response.ok) throw new Error('Failed to fetch Pokémon list');
            return response.json();
        }
    });

    const { data: pokemonDetails, isLoading: isLoadingDetails } = useQuery({
        queryKey: ['pokemonDetails', pokemonListData],
        enabled: !!pokemonListData,
        queryFn: async () => {
            const detailPromises = pokemonListData.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                if (!response.ok) throw new Error(`Failed to fetch details for ${pokemon.name}`);
                return response.json();
            });

            return Promise.all(detailPromises);
        }
    });

    const isLoading = isLoadingList || isLoadingDetails;

    const filteredPokemon = pokemonDetails?.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.toString() === searchQuery
    );

    const totalPages = filteredPokemon ? Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE) : 0;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedPokemon = filteredPokemon?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToNextPage = () => setPage(p => Math.min(p + 1, totalPages));
    const goToPrevPage = () => setPage(p => Math.max(p - 1, 1));

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    if (!filteredPokemon?.length) {
        return (
            <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">No Pokémon Found</h3>
                <p className="text-gray-500">Try a different search term</p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedPokemon?.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={goToPrevPage}
                        disabled={page === 1}
                        variant="outline"
                    >
                        Previous
                    </button>
                    <span className="text-sm font-medium">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={page === totalPages}
                        variant="outline"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PokemonList;
