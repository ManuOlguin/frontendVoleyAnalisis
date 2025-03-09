"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {fetchMatches } from "../utils/api";
import MatchCard from "@/components/matchCard";

export default function Home() {
  const [matchesLoading, setMatchesLoading] = useState(false);

  const [matches, setMatches] = useState<any[]>([]);
  useEffect(() => {
    const fetchMatchesData = async () => {
      setMatchesLoading(true);
      const { data, error } = await fetchMatches();
      console.log('Matches:', data);
      setMatchesLoading(false);
      if (error) {
        return;
      }
      setMatches(data);
    };
    fetchMatchesData();
  }
  , []);

  return (
    <div className="flex justify-center py-12 md:px-20 px-4 ">
    <div className="   font-[family-name:var(--font-geist-sans)] w-full">
      <h1 className="md:text-5xl text-3xl font-bold mb-12 text-center">Voleybola</h1>
      <div className="flex justify-center flex-wrap gap-6">
      <Link href="/addmatch">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 ">
          Agregar Partido
        </button>
      </Link>
      <Link href="/ranking">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
          Ranking
        </button>
      </Link>
      <Link href="/addplayer">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
          Agregar Jugador
        </button>
      </Link>
      </div>
      <h2 className="text-3xl font-semibold mt-12 text-center">Partidos</h2>
      <div className="flex justify-center">
      {matchesLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {matches.slice(0).reverse().map((match) => (
            <MatchCard key={match.id} data={match} />
          ))}
        </div>
      )}
      </div>
      </div>
      </div>
  );
}
