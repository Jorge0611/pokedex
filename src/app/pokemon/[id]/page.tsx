import { pokemonSchema } from "@/app/pokemon/[id]/schema";
import Image from "next/image";

async function getPokemonByName(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();
  return pokemonSchema.parse(pokemon);
}

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const pokemon = await getPokemonByName(params.id);

  return (
    <div className="container mx-auto flex flex-col items-center space-x-8">
      <h1 className="text-6xl font-bold capitalize">{pokemon.name}</h1>

      <Image
        src={pokemon.sprites.other.dream_world.front_default}
        alt={params.id}
        width={512}
        height={512}
      />

      <section className="flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold">Stats</h2>
        <ul className="flex flex-col items-center">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
