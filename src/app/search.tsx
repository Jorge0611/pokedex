"use client";

import { Pokemon } from "@/app/api";

export function Search({ types }: { types: Pokemon[] }) {
  return (
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
  );
}
