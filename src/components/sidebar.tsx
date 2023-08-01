"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Sidebar() {
  const pathname = usePathname(); //usePathname

  const ROUTES = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Pokemon",
      path: "/pokemon",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  return (
    <div className="inset-y-0 hidden w-72 flex-col border-r p-6 md:flex">
      <nav className="flex flex-col space-y-3">
        {ROUTES.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`flex flex-row justify-between hover:border-b ${
              pathname === route.path ? "text-red-600" : ""
            }`}
          >
            <span>{route.name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-right"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </Link>
        ))}
      </nav>
    </div>
  );
}
