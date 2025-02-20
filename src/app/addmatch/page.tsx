"use client";
import React, { useState } from "react";
import Head from "next/head";
import { fetchPlayers, submitMatchData } from "../../utils/api";
import { Player } from "../../utils/types";
import SetsCard from "@/components/setsCard";
import { SetData } from "@/components/setsCard";
const addMatchPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [sets, setSets] = useState<number>(5);
  const [date, setDate] = useState<string>("");
  const [team1Players, setTeam1Players] = useState<number[]>(Array(6).fill(0));
  const [team2Players, setTeam2Players] = useState<number[]>(Array(6).fill(0));
  const [team1PlayersNames, setTeam1PlayersNames] = useState<string[]>(Array(6).fill(""));
  const [team2PlayersNames, setTeam2PlayersNames] = useState<string[]>(Array(6).fill(""));
  const [setsData, setSetsData] = useState<SetData[]>();
  const [playerLoading, setPlayerLoading] = useState(true);
  const [allDropboxesFilled, setAllDropboxesFilled] = useState(false);

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

  const handleSetDataChange = (index: number, data: SetData) => {
    setSetsData((prevSetsData) => {
      const newSetsData = prevSetsData ? [...prevSetsData] : [];
      newSetsData[index] = data;
      return newSetsData;
    });
  };

  const checkIfAllDropboxesFilled = () => {
    const allPlayersSelected = [...team1Players, ...team2Players].every(playerId => playerId !== 0);
    setAllDropboxesFilled(allPlayersSelected);
    console.log(allPlayersSelected, team1Players, team2Players, team1PlayersNames, team2PlayersNames);
  };

  React.useEffect(() => {
    checkIfAllDropboxesFilled();
  }, [team1Players, team2Players]);

  const isPlayerSelected = (playerId: number) => {
    return team1Players.includes(playerId) || team2Players.includes(playerId);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const matchData = {
      date,
      sets,
      team1Players,
      team2Players,
      setsData,
    };
    await submitMatchData(matchData);
    window.location.reload();
  };

  return (
    <>
    <Head>
    <title>Agregar Partido</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <div className="container mx-auto p-2 md:p-4 mt-8 ">
      <a href="/" className="text-blue-500 hover:underline flex items-center mb-4">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Tuki
      </a>
      <h1 className="text-4xl text-center font-bold  mb-12">Agregar Partido</h1>
      {!playerLoading ? (
        <form className="" onSubmit={handleSubmit}>
          <div className="flex w-full justify-center mb-10">
            <div className="w-1/2 mr-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm"
              />{" "}
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-sm font-medium text-gray-700">
                Número de Sets
              </label>
              <input
                type="number"
                value={sets > 0 ? sets : ""}
                min={1}
                required
                onChange={(e) => {
                  const newSets = Number(e.target.value);
                  setSets(newSets);
                  setSetsData((prevSetsData) => {
                    if (prevSetsData) {
                      return prevSetsData.slice(0, newSets);
                    }
                    return [];
                  });
                }}
                className="mt-1 block w-full border text-black text-slate-200 p-2 border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <h2 className="text-xl font-semibold">Equipo 1</h2>
                  {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                    Jugador {index + 1}
                    </label>
                    <select
                    required
                    value={team1Players[index]}
                    onChange={(e) => {
                    const newTeam1Players = [...team1Players];
                    newTeam1Players[index] = Number(e.target.value);
                    setTeam1Players(newTeam1Players);
                    setTeam1PlayersNames((prevTeam1PlayersNames) => {
                      const newTeam2PlayersNames = [...prevTeam1PlayersNames];
                      newTeam2PlayersNames[index] = players.find((player) => player.id === Number(e.target.value))?.name ?? "";
                      return newTeam2PlayersNames;
                      })
                    }}
                    className="mt-1 block w-full border p-2 border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm"
                    >
                    <option value=""  hidden>
                    </option>                    {players.map((player) => (
                    <option
                    key={player.id}
                    value={player.id}
                    disabled={isPlayerSelected(player.id) && team1Players[index] !== player.id}
                    >
                      {player.name}
                      </option>
                    ))}
                    </select>
                  </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Equipo 2</h2>
                  {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                    Jugador {index + 1}
                    </label>
                    <select
                    required
                    value={team2Players[index]}
                    onChange={(e) => {
                    const newTeam2Players = [...team2Players];
                    newTeam2Players[index] = Number(e.target.value);
                    setTeam2Players(newTeam2Players);
                    setTeam2PlayersNames((prevTeam2PlayersNames) => {
                    const newTeam2PlayersNames = [...prevTeam2PlayersNames];
                    newTeam2PlayersNames[index] = players.find((player) => player.id === Number(e.target.value))?.name ?? "";
                    return newTeam2PlayersNames;
                    })
                    
                    }
                  }
                    
                    className="mt-1 block w-full border p-2 border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm"
                    >
                    <option value=""  hidden>
                    </option>
                    {players.map((player) => (
                    <option
                    key={player.id}
                    value={player.id}
                    disabled={isPlayerSelected(player.id) && team2Players[index] !== player.id}
                    >
                      {player.name}
                      </option>
                    ))}
                    </select>
                  </div>
                  ))}
                </div>
                </div>
                <div className="mt-10">
                {allDropboxesFilled && (
                  <>
                <h2 className="text-xl font-semibold text-center">Resultados</h2>
                <div className="flex flex-wrap justify-center">
                  {Array.from({ length: sets }).map((_, index) => (
                  <SetsCard
                    key={index}
                    keysita={(index + 1).toString()}
                    onDataChange={handleSetDataChange}
                    team1Name={team1PlayersNames}
                    team2Name={team2PlayersNames}
                    team1Players={team1Players}
                    team2Players={team2Players}
                  />
                  ))}
            </div></>)}
          </div>
          {allDropboxesFilled && (
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded-full font-semibold transition duration-150 ease-in-out bg-slate-500 text-white hover:bg-slate-600"
            >
              Guardar Partido
            </button>{" "}
          </div>)}
        </form>
      ) : (
        <div role="status" className="flex justify-center items-center mt-20 ">
          <svg
            aria-hidden="true"
            className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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

export default addMatchPage;
