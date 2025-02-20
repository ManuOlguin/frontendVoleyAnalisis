"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {fetchMatches } from "../utils/api";
import MatchCard from "@/components/matchCard";

export default function Home() {
  const [matchesLoading, setMatchesLoading] = useState(false);

  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchMatchesData = async () => {
      setMatchesLoading(true);
      const { data, error } = await fetchMatches();
      console.log('Matches:', data);
      setMatchesLoading(false);
      if (error) {
        setError(error);
        return;
      }
      setMatches(data);
    };
    fetchMatchesData();
  }
  , []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 p-8 pb-20 gap-16 sm:p-20">
    <div className="   min-h-screen  font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold mb-12 text-center">Voleybola</h1>
      <div className="flex justify-center">
      <Link href="/addmatch">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 mr-5">
          Agregar Partido
        </button>
      </Link>
      <Link href="/ranking">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
          Ranking
        </button>
      </Link>
      </div>
      <h2 className="text-3xl font-semibold mt-12">Partidos</h2>
      {matchesLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="">
          {matches.map((match) => (
            <MatchCard key={match.id} data={match} />
          ))}
                </div>
      )}
      </div>
      </div>
  );
}
