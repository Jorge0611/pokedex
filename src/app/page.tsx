import { getPokemonTypes, getPokemons } from "@/app/api";
import { Search } from "@/app/search";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { name: string; type: string };
}) {
  const pokemons = await getPokemons();
  const types = await getPokemonTypes();

  if (searchParams.name) {
    redirect(`/pokemon/${searchParams.name}`);
  }

  return (
    <>
      <Search types={types} />
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
