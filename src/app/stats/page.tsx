"use client";
import React, {useState} from "react";
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
  const [setsData, setSetsData] = useState<SetData[]>();

  React.useEffect(() => {
    fetchPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  const handleSetDataChange = (index: number, data: SetData) => {
    setSetsData((prevSetsData) => {
      const newSetsData = prevSetsData ? [...prevSetsData] : [];
      newSetsData[index] = data;
      return newSetsData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const matchData = {
      date,
      sets,
      team1Players,
      team2Players,
      setsData
    };
    await submitMatchData(matchData);
  };

  return (
  <div className="container mx-auto p-4 mt-8">
    <h1 className="text-3xl text-center font-bold  mb-4">Agregar Partido</h1>
    <form className="">
      <div className="flex w-full justify-center mb-10"> 
      <div className="w-1/2 mr-2">
      <label className="block text-sm font-medium text-gray-700">Fecha</label>
      <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm"
            />    </div>
    <div className="w-1/2 ml-2">
      <label className="block text-sm font-medium text-gray-700">Número de Sets</label>
      <input
        type="number"
        value={sets > 0 ? sets : ""}
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
        <label className="block text-sm font-medium  text-gray-700">Jugador {index + 1}</label>
        <select
                  value={team1Players[index]}
                  onChange={(e) => {
                    const newTeam1Players = [...team1Players];
                    newTeam1Players[index] = Number(e.target.value);
                    setTeam1Players(newTeam1Players);
                  }}
                  className="mt-1 block w-full border p-2 border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm"
                >
                  <option value={0}>Seleccionar Jugador</option>
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
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
        <label className="block text-sm font-medium text-gray-700">Jugador {index + 1}</label>
        <select
                  value={team2Players[index]}
                  onChange={(e) => {
                    const newTeam2Players = [...team2Players];
                    newTeam2Players[index] = Number(e.target.value);
                    setTeam2Players(newTeam2Players);
                  }}
                  className="mt-1 block w-full border p-2 border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm"
                >
                  <option value={0}>Seleccionar Jugador</option>
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  ))}
                </select>
        </div>
      ))}
      </div>
    </div>
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-center">Resultados</h2>
      <div className="flex flex-wrap justify-center">
        {Array.from({ length: sets }).map((_, index) => (
         
        <SetsCard key={index} keysita={(index + 1).toString()} onDataChange={handleSetDataChange}  />
        ))}
      </div>

    </div>
    <div className="flex justify-center mt-4">
    <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full font-semibold transition duration-150 ease-in-out bg-slate-500 text-white hover:bg-slate-600"
          >
            Guardar Partido
          </button>    </div>
    </form>
  </div>
  );
};

export default addMatchPage;
