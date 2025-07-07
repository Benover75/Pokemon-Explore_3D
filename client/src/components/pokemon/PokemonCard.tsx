import { Pokemon } from '@/lib/pokemon-api';

interface PokemonCardProps {
  pokemon: Pokemon;
  onViewIn3D: (pokemonName: string) => void;
}

export default function PokemonCard({ pokemon, onViewIn3D }: PokemonCardProps) {
  const primaryType = pokemon.types[0].type.name;

  return (
    <div className={`glass rounded-2xl p-8 card-3d pokemon-card-hover pokemon-type-${primaryType}`}>
      <div className="text-center">
        <div className="relative mb-6">
          <span className="absolute top-4 right-4 text-white text-opacity-50 font-mono text-lg">
            #{pokemon.id}
          </span>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-48 h-48 mx-auto object-contain filter drop-shadow-2xl hover:scale-110 transition-transform duration-500"
          />
        </div>
        <h2 className="font-orbitron font-bold text-3xl text-white mb-4 capitalize">
          {pokemon.name}
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`type-badge pokemon-type-${type.type.name} px-4 py-2 rounded-full text-white font-semibold text-sm capitalize`}
              style={{ 
                background: `linear-gradient(135deg, hsl(var(--${type.type.name})), rgba(255,255,255,0.2))`
              }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <button
          onClick={() => onViewIn3D(pokemon.name)}
          className="bg-gradient-to-r from-[hsl(193,100%,50%)] to-[hsl(280,50%,60%)] px-6 py-3 rounded-xl font-orbitron font-bold text-white hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          View in 3D
        </button>
      </div>
    </div>
  );
}
