export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
}

export async function searchPokemon(query: string): Promise<Pokemon> {
  const name = isNaN(Number(query)) ? query.toLowerCase() : query;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  
  if (!response.ok) {
    throw new Error('Pokémon not found');
  }
  
  return response.json();
}

export async function getRandomPokemon(): Promise<Pokemon> {
  const randomId = Math.floor(Math.random() * 898) + 1;
  return searchPokemon(randomId.toString());
}
