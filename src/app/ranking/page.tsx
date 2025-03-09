"use client";
import React, { useState } from "react";
import Head from "next/head";
import { fetchPlayers, fetchMatches } from "../../utils/api";
import { Player, Match, Player2 } from "../../utils/types";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfDavid } from "@fortawesome/free-solid-svg-icons"; // Use the solid version
const Ranking: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerLoading, setPlayerLoading] = useState(true);
  const [playersup, setPlayersup] = useState<Player2[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchLoading, setMatchLoading] = useState(true);
  const [protas, setProtas] = useState
  <boolean>(false);
  React.useEffect(() => {
    const loadPlayers = async () => {
      try {
        setPlayerLoading(true);
        const data = await fetchPlayers();
        if (data.error) {
          return;
        }
        setPlayers(data.data);
        setPlayerLoading(false);

        return data.data;
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    const loadMatches = async () => {
      try {
        setMatchLoading(true);
        const data = await fetchMatches();
        if (data.error) {
          return;
        }
        setMatchLoading(false);
        setMatches(data.data);
        return data.data;
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    const dataAnalysis = async () => {
      const matchsitos: Match[] = await loadMatches();
      const playersitos: Player[] = await loadPlayers();
      const updatedPlayers = playersitos.map((player) => {
        const playerMatchesTeam1 = matchsitos.filter((match) =>
          match.teams[0].team_player.some(
            (playerObj) => playerObj.player_id === player.id
          )
        );
        console.log("playerMatchesTeam1", playerMatchesTeam1);

        const playerMatchesTeam2 = matchsitos.filter((match) =>
          match.teams[1].team_player.some(
            (playerObj) => playerObj.player_id === player.id
          )
        );
        console.log("playerMatchesTeam2", playerMatchesTeam2);

        const playerMatches = [...playerMatchesTeam1, ...playerMatchesTeam2];
        const totalSets = playerMatches.reduce(
          (acc, match) => acc + match.sets.length,
          0
        );

        const wonSets1 = playerMatchesTeam1.reduce((acc, match) => {
          return (
            acc + match.sets.filter((set) => set.winner_known === 1).length
          );
        }, 0);
        const wonSets2 = playerMatchesTeam2.reduce((acc, match) => {
          return (
            acc + match.sets.filter((set) => set.winner_known === 2).length
          );
        }, 0);
        const wonSets = wonSets1 + wonSets2;
        const loseSets = totalSets - wonSets;
        const winPercentage = totalSets > 0 ? (wonSets / totalSets) * 100 : 0;
        const losePercentage = totalSets > 0 ? (loseSets / totalSets) * 100 : 0;
        return {
          ...player,
          winPercentage,
          losePercentage,
          setsWon: wonSets,
          setsLost: loseSets,
        };
      });
      setPlayersup(updatedPlayers);

      console.log("datitaRiquita", updatedPlayers);
    };
    dataAnalysis();
  }, []);

  return (
    <>
      <Head>
        <title>Ranking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto p-4 mt-8 font-PT_Sans">
        <Link
          href="/"
          className="text-blue-500 hover:underline flex items-center mb-4 "
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Volver
        </Link>
        <h1 className="text-4xl text-center font-bold  mb-12">Ranking</h1>
        <div className="flex justify-center mb-4">
            <label className={`flex items-center space-x-2 cursor-pointer px-28  py-2 rounded-xl ${
                protas ? "bg-purple-600" : "bg-purple-900"}`}>
            <div className="relative ">
              <input
              type="checkbox"
              className="sr-only"
              checked={protas}
              onChange={() => setProtas(!protas)}
              />

              <FontAwesomeIcon
              icon={faStarOfDavid}
              className={` transition-transform text-center duration-300 ${
              protas ? "transform  rotate-180 text-purple-200" : "text-purple-200"
              }`}
              />
            </div>

            </label>
        </div>
        {!playerLoading ? (
          <table className="shadow-md rounded-lg overflow-hidden mx-auto">
            <thead className="bg-purple-600 text-purple-100">
              <tr>
                <th className="py-3 text-left"></th>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Jugador</th>
                <th className="py-3 px-4 text-left">ELO</th>
                <th className="py-3 p-4 text-left">Winrate %</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {playersup
                .sort((a, b) => (b.elo ?? 0) - (a.elo ?? 0))
                .map((player) => {
                  let elo = player.elo ?? 700; // Default to 700 if null
                  let minElo = 700;
                  let maxElo = 1300;

                  // Normalize the ELO value between 0 and 1
                  let normalized = Math.max(
                    0,
                    Math.min(1, (elo - minElo) / (maxElo - minElo))
                  );

                  // Calculate background color (black → purple)
                  let red = Math.round(128 * normalized);
                  let blue = Math.round(255 * normalized);
                  let bgColor = `rgb(${red}, 0, ${blue})`;

                  // Calculate text color (white → black)
                  let textGray = Math.round(255 * normalized) + 40; // Inverse of red
                  let textColor = `rgb(${textGray}, ${textGray}, ${textGray})`;

                  return (
                    <tr
                      key={player.id}
                      className="font-semibold "
                      style={{backgroundColor: bgColor, display: protas && !player.prota ? "none" : "table-row" }}
                    >
                      <td className="py-2 pl-3 w-1 text-purple-700">
                        {player.prota && (
                          <FontAwesomeIcon icon={faStarOfDavid} />
                        )}
                      </td>
                      <td className="py-2 px-4 text-center text-purple-400">
                        {playersup.indexOf(player) + 1}
                      </td>
                      <td className="py-2 px-4 text-purple-200">
                        {player.name}
                      </td>
                      <td className="py-2 px-4 text-purple-300">
                        {player.elo?.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-purple-400  ">
                        <div className="flex w-28 text-white items-center justify-between font-normal text-sm">


                          <div className=" bg-purple-800 rounded-md w-16">
                            <div
                              className="py-2 bg-purple-400 rounded-md"
                              style={{
                                width: `${
                                  player.winPercentage > 0
                                    ? player.winPercentage
                                    : 0
                                }%`,
                              }}
                            ></div>
                            
                          </div>
                          <div className="">
                            {player.winPercentage.toFixed(0)}%
                          </div>
                        </div>
                      </td>
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
