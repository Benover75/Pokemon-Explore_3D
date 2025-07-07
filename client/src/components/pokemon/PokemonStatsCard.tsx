import { Pokemon } from '@/lib/pokemon-api';

interface PokemonStatsCardProps {
  pokemon: Pokemon;
}

export default function PokemonStatsCard({ pokemon }: PokemonStatsCardProps) {
  return (
    <div className="glass rounded-2xl p-8 card-3d">
      <h3 className="font-orbitron font-bold text-xl text-white mb-6">Battle Stats</h3>
      <div className="space-y-4">
        {pokemon.stats.map((stat) => (
          <div key={stat.stat.name} className="flex justify-between items-center">
            <span className="text-gray-300 capitalize font-medium">
              {stat.stat.name.replace('-', ' ')}
            </span>
            <div className="flex items-center space-x-3">
              <div className="w-32 h-3 bg-white bg-opacity-20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[hsl(348,83%,60%)] to-[hsl(280,50%,60%)] rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
                />
              </div>
              <span className="text-white font-mono text-sm w-8">{stat.base_stat}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="glass-dark rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">Height</p>
          <p className="text-white font-orbitron font-bold text-lg">
            {(pokemon.height / 10).toFixed(1)}m
          </p>
        </div>
        <div className="glass-dark rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">Weight</p>
          <p className="text-white font-orbitron font-bold text-lg">
            {(pokemon.weight / 10).toFixed(1)}kg
          </p>
        </div>
      </div>

      {pokemon.abilities.length > 0 && (
        <div className="mt-6">
          <h4 className="text-white font-semibold mb-3">Abilities</h4>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className="glass-dark rounded-lg px-3 py-1 text-sm text-white capitalize"
              >
                {ability.ability.name.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
