"use client";
import React from "react";
import { fetchPlayers } from "../../utils/api";
import { Player } from "../../utils/types";
import SetsCard from "@/components/setsCard";
const addMatchPage: React.FC = () => {
  const [players, setPlayers] = React.useState<Player[]>([]);

  React.useEffect(() => {
    fetchPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  return (
  <div className="container mx-auto p-4 mt-8">
    <h1 className="text-3xl text-center font-bold  mb-4">Agregar Partido</h1>
    <form className="">
      <div className="flex w-full justify-center mb-10"> 
      <div className="w-1/2 mr-2">
      <label className="block text-sm font-medium text-gray-700">Fecha</label>
      <input type="date" className="mt-1 block w-full p-2 border border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm" />
    </div>
    <div className="w-1/2 ml-2">
      <label className="block text-sm font-medium text-gray-700">Número de Sets</label>
      <input type="number" min="1" className="mt-1 block w-full border text-black text-slate-200 p-2 border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm" />
    </div>
      </div>
    
    <div className="grid grid-cols-2 gap-4 ">
      <div>
      <h2 className="text-xl font-semibold">Equipo 1</h2>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="mt-2">
        <label className="block text-sm font-medium  text-gray-700">Jugador {index + 1}</label>
        <select className="mt-1 block w-full border p-2 border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm">
          <option value="">Seleccionar jugador</option>
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
        <select className="mt-1 block w-full border p-2 border-slate-600 bg-slate-700 border-2 rounded-md shadow-sm">
          <option value="">Seleccionar jugador</option>
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
        {Array.from({ length: 5 }).map((_, index) => (
         
        <SetsCard key={index} />
        ))}
      </div>

    </div>
    <div className="flex justify-center">
      <button type="submit" className="mt-6 px-10 py-2 bg-blue-600 w-80 text-white rounded-md shadow-sm">Enviar</button>
    </div>
    </form>
  </div>
  );
};

export default addMatchPage;
