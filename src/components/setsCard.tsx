import React, { useState } from "react";

const SetsCard: React.FC = () => {
    const [team, setTeam] = useState("team1");
    const [disabled, setDisabled] = useState(false);
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [showGanador, setShowGanador] = useState(false);


    return (
        <div className="p-6 bg-slate-700 rounded-lg shadow-lg w-80 mx-10 my-4">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold text-slate-200 mb-4 ">Set 1</h2>
                <button
                    type="button"
                    onClick={() => setDisabled(!disabled)}
                    className={`px-4 py-1 rounded-full font-semibold transition duration-150 ease-in-out ${
                        disabled
                            ? "bg-slate-500 text-white hover:bg-slate-600 border-green-500 border-4 border-solid"
                            : "bg-slate-500 text-white hover:bg-slate-600 text-slate-700  border-4 border-solid border-slate-500 hover:border-slate-600" 
                    }`}
                >
                    Gagá
                </button>
               
            </div>

            {disabled ? (
                 <div className="h-36 flex items-center justify-center">
                 <h1 className="text-center font-semibold">ESTE SET ESTUVO GAGÁ, NO AFECTARÁ EL ELO</h1>
             </div>
            ) :
            !showGanador ? (
                <>
                    <h4 className="text-md font-semibold text-slate-200 mb-2 text-center mt-3">Puntos</h4>
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="block text-slate-200 font-medium">
                                Equipo 1:
                                <input
                                    type="number"
                                    value={number1}
                                    onChange={(e) => setNumber1(Number(e.target.value))}
                                    disabled={disabled}
                                    className="mt-1 block w-24 px-4 py-2 border text-slate-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out hover:border-blue-500"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-slate-200 font-medium">
                                Equipo 2:
                                <input
                                    type="number"
                                    value={number2}
                                    onChange={(e) => setNumber2(Number(e.target.value))}
                                    disabled={disabled}
                                    className="mt-1 block w-24 px-4 py-2 border text-slate-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out hover:border-blue-500"
                                />
                            </label>
                        </div>
                    </div>
                </>
            ) : (
                <div className="h-28">
                    <h4 className="text-md font-semibold text-slate-200 mb-2 mt-3 text-center">Ganador</h4>
                    <div className="mt-6 flex justify-around">
                        <button
                            type="button"
                            onClick={() => setTeam("team1")}
                            disabled={disabled}
                            className={`px-4 py-2 rounded-full font-semibold transition duration-150 ease-in-out ${
                                team === "team1"
                                    ? "bg-blue-500 text-white"
                                    : "bg-slate-500 text-white hover:bg-slate-600"
                            }`}
                        >
                            Team 1
                        </button>
                        <button
                            type="button"
                            onClick={() => setTeam("team2")}
                            disabled={disabled}
                            className={`px-4 py-2 rounded-full font-semibold transition duration-150 ease-in-out ${
                                team === "team2"
                                    ? "bg-blue-500 text-white"
                                    : "bg-slate-500 text-white hover:bg-slate-600"
                            }`}
                        >
                            Team 2
                        </button>
                    </div>
                </div>
            )}
            {!disabled ? (
            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    onClick={() => setShowGanador(!showGanador)}
                    className="px-4 py-2 rounded-full font-semibold transition duration-150 ease-in-out bg-slate-500 text-white hover:bg-slate-600"
                >
                    {showGanador ? "Hay puntos" : "No hay puntos"}
                </button>
            </div>
            ) : null}
        </div>
    );
};

export default SetsCard;
