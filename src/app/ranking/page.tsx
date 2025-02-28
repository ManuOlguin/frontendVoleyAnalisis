"use client";
import React, { useState } from "react";
import Head from "next/head";
import { fetchPlayers } from "../../utils/api";
import { Player } from "../../utils/types";
import Link from "next/link";
const Ranking: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerLoading, setPlayerLoading] = useState(true);

  React.useEffect(() => {
    const loadPlayers = async () => {
      try {
        setPlayerLoading(true);
        const data = await fetchPlayers();
        if (data.error) {
          return;
        }
        setPlayerLoading(false);

        setPlayers(data.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    loadPlayers();
  }, []);

 
  return (
    <>
    <Head>
    <title>Ranking</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <div className="container mx-auto p-4 mt-8">
    <Link href="/" className="text-blue-500 hover:underline flex items-center mb-4">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Tuki
      </Link>
      <h1 className="text-4xl text-center font-bold  mb-12">Ranking</h1>
      {!playerLoading ? (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Jugador</th>
              <th className="py-3 px-4 text-left">ELO</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {players
              .sort((a, b) => (b.elo ?? 0) - (a.elo ?? 0))
              .map((player) => {
          let rowClass = "";
          if (player.elo !== null && player.elo >= 900 && player.elo <= 1100) {
            rowClass = "bg-gradient-to-r from-red-500 to-red-600 transition duration-500 ease-in-out transform ";
          } else if (player.elo !== null && player.elo >= 1101 && player.elo <= 1200) {
            rowClass = "bg-yellow-400";
          } else if (player.elo !== null && player.elo > 1200) {
            rowClass = "bg-green-100";
          }
          return (
            <tr key={player.id} className={`border-t ${rowClass} font-semibold`}>
              <td className="py-2 px-4">{player.name}</td>
              <td className="py-2 px-4">{player.elo}</td>
            </tr>
          );
              })}
          </tbody>
        </table>
      ) : (
        <div role="status" className="flex justify-center items-center mt-20">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
    </>
  );
};

export default Ranking;
