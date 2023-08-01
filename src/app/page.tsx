import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

const PokemonSchema = z.object({
  name: z.string(),
  url: z.string(),
});

async function getPokemonByName(name?: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return z.array(PokemonSchema).parse(data.results);
}

async function getPokemonTypes() {
  const response = await fetch(`https://pokeapi.co/api/v2/type/`);
  const data = await response.json();
  return z.array(PokemonSchema).parse(data.results);
}

export default async function Home({
  searchParams,
}: {
  searchParams: { name: string; type: string };
}) {
  const pokemons = await getPokemonByName(searchParams.name || "");
  const types = await getPokemonTypes();

  return (
    <>
      <form className="flex flex-row space-x-1">
        <input
          type="text"
          name="name"
          className="w-full rounded bg-neutral-100 dark:bg-neutral-800 dark:focus:bg-neutral-900"
        />
        <select className="rounded bg-neutral-100 capitalize dark:bg-neutral-800 dark:focus:bg-neutral-900">
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded bg-blue-600 px-8 py-2 active:bg-blue-700 dark:bg-blue-800 dark:active:bg-blue-900"
        >
          Search
        </button>
      </form>

      <section title="Results">
        <ul className="grid grid-cols-3 gap-4 md:grid-cols-4">
          {pokemons.map((pokemon, index) => (
            <li key={pokemon.name}>
              <Link
                href={`/pokemon/${pokemon.name}`}
                className="flex flex-col items-center rounded bg-white p-4 dark:bg-neutral-700"
              >
                <h2 className="text-xl capitalize">{pokemon.name}</h2>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png`}
                  alt={pokemon.name}
                  width={128}
                  height={128}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
