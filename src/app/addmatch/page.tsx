"use client";

import React from "react";
import { fetchPlayers } from "../../utils/api";
const StatsPage: React.FC = () => {
  const [players, setPlayers] = React.useState([]);

  React.useEffect(() => {
    fetchPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Stats Page
        </h1>
        <p className="text-gray-400 text-center">
          Welcome to the stats page. Here you can find various statistics and
          analysis.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-white">Players</h2>
          <ul>
            {players.map((player: any) => (
              <li key={player.id} className="text-gray-400">
                {player.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
