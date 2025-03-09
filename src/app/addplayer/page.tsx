"use client";
import React, { useState } from "react";
import Head from "next/head";
import { addPlayer } from "../../utils/api";
import { Player, Match, Player2 } from "../../utils/types";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfDavid } from "@fortawesome/free-solid-svg-icons"; // Use the solid version
const Ranking: React.FC = () => {

  const [name, setName] = useState("");
  const [isCaptain, setIsCaptain] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddPlayer = async () => {
    setLoading(true);
    try {
      const newPlayer: Player = { name, prota: isCaptain, elo: null, id: 0 };
      await addPlayer(newPlayer);
    } catch (error) {
      console.error("Error adding player:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Agregar Player</title>
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
        <h1 className="text-4xl text-center font-bold  mb-12">Agregar Player</h1>
        <form className="max-w-md mx-auto  ">
          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="name">
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Ej: Huguito"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="isCaptain">
              <input
          className="mr-2 leading-tight"
          type="checkbox"
          id="isCaptain"
          checked={isCaptain}
          onChange={(e) => setIsCaptain(e.target.checked)}
              />
              ¿Es prota?
            </label>
          </div>
            <button
            className={`bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            type="button"
            onClick={async () => {
              await handleAddPlayer();
              window.location.reload();
            }}
            disabled={loading}
            >
            {loading ? "Agregando..." : "Agregar Player"}
            </button>
        </form>
      </div>
      </>
  );
};

export default Ranking;
