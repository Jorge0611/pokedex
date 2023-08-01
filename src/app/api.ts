import { z } from "zod";

const PokemonSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export async function getPokemons() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await response.json();
  return z.array(PokemonSchema).parse(data.results);
}

export async function getPokemonTypes() {
  const response = await fetch(`https://pokeapi.co/api/v2/type/`);
  const data = await response.json();
  return z.array(PokemonSchema).parse(data.results);
}
