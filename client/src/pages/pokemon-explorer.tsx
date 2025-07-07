import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import SearchBar from '@/components/ui/SearchBar';
import PokemonCard from '@/components/pokemon/PokemonCard';
import PokemonStatsCard from '@/components/pokemon/PokemonStatsCard';
import ModelViewerModal from '@/components/pokemon/ModelViewerModal';
import ParticleBackground from '@/components/three/ParticleBackground';
import FloatingElements from '@/components/three/FloatingElements';
import { searchPokemon, getRandomPokemon, type Pokemon } from '@/lib/pokemon-api';
import { useParallax } from '@/hooks/use-parallax';
import { useToast } from '@/hooks/use-toast';

export default function PokemonExplorer() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollY = useParallax();
  const { toast } = useToast();

  // Query for searched Pokemon
  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon', searchQuery],
    queryFn: () => searchPokemon(searchQuery),
    enabled: !!searchQuery,
    retry: false,
  });

  // Query for random Pokemon on initial load
  const { data: randomPokemon } = useQuery({
    queryKey: ['pokemon', 'random'],
    queryFn: getRandomPokemon,
    retry: false,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewIn3D = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon('');
  };

  const displayedPokemon = pokemon || randomPokemon;

  useEffect(() => {
    if (error) {
      toast({
        title: "Pokémon Not Found",
        description: "Try searching with a different name or ID number.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="min-h-screen overflow-x-hidden font-inter">
      <ParticleBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <FloatingElements />
        
        <div className="max-w-2xl mx-auto text-center z-10">
          <div 
            className="mb-8"
            style={{ transform: `translateY(${scrollY * -0.5}px)` }}
          >
            <h2 className="font-orbitron font-black text-6xl md:text-8xl text-white mb-4 animate-float">
              <span className="bg-gradient-to-r from-[hsl(348,83%,60%)] via-[hsl(280,50%,60%)] to-[hsl(193,100%,50%)] bg-clip-text text-transparent">
                EXPLORE
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-light">
              Discover Pokémon in stunning 3D environments
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </section>

      {/* Results Section */}
      <section className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="glass rounded-2xl p-8 text-center card-3d">
              <div className="loading-spinner mx-auto mb-4" />
              <p className="text-white font-inter">Searching the Pokémon universe...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="glass rounded-2xl p-8 text-center card-3d">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-orbitron font-bold text-xl text-white mb-2">Pokémon Not Found</h3>
              <p className="text-gray-300">Try searching with a different name or ID number.</p>
            </div>
          )}

          {/* Pokemon Results */}
          {displayedPokemon && !isLoading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PokemonCard pokemon={displayedPokemon} onViewIn3D={handleViewIn3D} />
              <PokemonStatsCard pokemon={displayedPokemon} />
            </div>
          )}
        </div>
      </section>

      {/* 3D Model Viewer Modal */}
      <ModelViewerModal 
        isOpen={isModalOpen}
        pokemonName={selectedPokemon}
        onClose={closeModal}
      />
    </div>
  );
}
