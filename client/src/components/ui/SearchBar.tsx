import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const quickSearchOptions = ['pikachu', 'charizard', 'mewtwo'];

  const handleQuickSearch = (pokemon: string) => {
    setQuery(pokemon);
    onSearch(pokemon);
  };

  return (
    <div className="glass rounded-2xl p-8 card-3d">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Pokémon by name or ID..."
            className="w-full px-6 py-4 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 font-inter text-lg focus:outline-none search-glow transition-all"
            disabled={isLoading}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="w-6 h-6" />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-8 py-4 bg-gradient-to-r from-[hsl(348,83%,60%)] to-[hsl(280,50%,60%)] rounded-xl font-orbitron font-bold text-white hover:shadow-2xl transform hover:scale-105 transition-all animate-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <span className="text-gray-400 text-sm">Quick search:</span>
        {quickSearchOptions.map((pokemon) => (
          <button
            key={pokemon}
            onClick={() => handleQuickSearch(pokemon)}
            className="glass-dark rounded-lg px-3 py-1 text-sm text-white hover:bg-white hover:bg-opacity-20 transition-all capitalize"
            disabled={isLoading}
          >
            {pokemon}
          </button>
        ))}
      </div>
    </div>
  );
}
