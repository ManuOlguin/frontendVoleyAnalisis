import React, { useState, useEffect } from "react";

interface SetsCardProps {
    key: Number;
    keysita: string;
    onDataChange: (index: number, data: SetData) => void;
    team1Name: string[];
    team2Name: string[];
    team1Players: number[];
    team2Players: number[];
}

export interface SetData {
    team1Score: number;
    team2Score: number;
    winner: string;
    ignoreforelo: boolean;
    setOrder: number;
    team1Positions: string[];
    team2Positions: string[];
  }

const SetsCard: React.FC<SetsCardProps> = (props) => {
    const [winner, setTeam] = useState("team1");
    const [team1_5_1, setTeam1_5_1] = useState(false);
    const [team2_5_1, setTeam2_5_1] = useState(false);
    const [team1Positions, setTeam1Positions] = useState<string[]>(Array(6).fill(""));
    const [team2Positions, setTeam2Positions] = useState<string[]>(Array(6).fill(""));
    const [ignoreforelo, setDisabled] = useState(false);
    const [team1Score, setNumber1] = useState(0);
    const [team2Score, setNumber2] = useState(0);
    const [showGanador, setShowGanador] = useState(false);
    const [setOrder, setSetOrder] = useState<number>(Number(props.keysita));

    useEffect(() => {
        console.log("Set Order", setOrder, team1Positions, team2Positions);
        props.onDataChange(Number(props.keysita) -1, { team1Score, team2Score, winner, setOrder, ignoreforelo, team1Positions, team2Positions });
      }, [team1Score, team2Score, winner, setOrder, ignoreforelo, team1Positions, team2Positions]);

    return (
        <div className="p-6 bg-slate-700 rounded-lg shadow-lg w-80 mx-3 md:mx-10 my-4">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold text-slate-200 mb-4 ">Set {props.keysita}</h2>
                <button
                    type="button"
                    onClick={() => {
                        setDisabled(!ignoreforelo)
                        setTeam1Positions([]);
                        setTeam2Positions([]);
                        setTeam1_5_1(false);
                        setTeam2_5_1(false);

                    }}
                    className={`px-4 py-1 rounded-full font-semibold transition duration-150 ease-in-out ${
                        ignoreforelo
                            ? "bg-slate-500 text-white hover:bg-slate-600 border-green-500 border-4 border-solid"
                            : "bg-slate-500 text-white hover:bg-slate-600 text-slate-700  border-4 border-solid border-slate-500 hover:border-slate-600" 
                    }`}
                >
                    Gagá
                </button>
               
            </div>

            {ignoreforelo ? (
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
                                    required
                                    value={team1Score === 0 ? "" : team1Score}
                                    onChange={(e) => setNumber1(e.target.value === "" ? 0 : Number(e.target.value))}
                                    disabled={ignoreforelo}
                                    className="mt-1 block w-24 px-4 py-2 border text-slate-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out hover:border-blue-500"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-slate-200 font-medium">
                                Equipo 2:
                                <input
                                    type="number"
                                    required
                                    value={team2Score === 0 ? "" : team2Score}
                                    onChange={(e) => setNumber2(e.target.value === "" ? 0 : Number(e.target.value))}
                                    disabled={ignoreforelo}
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
                            disabled={ignoreforelo}
                            className={`px-4 py-2 rounded-full font-semibold transition duration-150 ease-in-out ${
                                winner === "team1"
                                    ? "bg-blue-500 text-white"
                                    : "bg-slate-500 text-white hover:bg-slate-600"
                            }`}
                        >
                            Team 1
                        </button>
                        <button
                            type="button"
                            onClick={() => setTeam("team2")}
                            disabled={ignoreforelo}
                            className={`px-4 py-2 rounded-full font-semibold transition duration-150 ease-in-out ${
                                winner === "team2"
                                    ? "bg-blue-500 text-white"
                                    : "bg-slate-500 text-white hover:bg-slate-600"
                            }`}
                        >
                            Team 2
                        </button>
                    </div>
                </div>
            )}
            {!ignoreforelo ? (
                <>
            <div className="flex justify-between mt-4">
                <label className="text-slate-200 font-medium mr-4">
                    <input
                        type="checkbox"
                        checked={team1_5_1}
                        onChange={() => {setTeam1_5_1(!team1_5_1)
                            setTeam1Positions(Array(6).fill(""));
                        } }
                        className="mr-2"
                    />
                    5-1
                </label>
                <label className="text-slate-200 font-medium">
                    <input
                        type="checkbox"
                        checked={team2_5_1}
                        onChange={() => {setTeam2_5_1(!team2_5_1)
                            setTeam2Positions(Array(6).fill(""));
                        } }
                        className="mr-2"
                    />
                    5-1
                </label>
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex flex-col">
                {team1_5_1 ? (
                    props.team1Name.map((player, index) => (
                        <div key={index}>
                            <div className="flex items-center mb-2">
                                <label className="text-slate-200 w-5 font-bold mr-2">{["A:", "O:", "P:", "P:", "C:", "C:"][index]}</label>
                                <select
                                required
                                    className="mt-1 block md:w-24 w-20 px-4 py-1 border text-slate-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out hover:border-blue-500"
                                    value={team1Positions[index] || ""}
                                    onChange={(e) => {
                                        const newPositions = [...team1Positions];
                                        newPositions[index] = e.target.value;
                                        setTeam1Positions(newPositions);
                                    }}
                                >
                                    <option value="" hidden>
                                    </option>
                                    {props.team1Name.map((name, idx) => (
                                        !team1Positions.includes(props.team1Players[idx].toString()) || team1Positions[index] === props.team1Players[idx].toString() ? (
                                            <option key={idx} value={props.team1Players[idx]}>
                                                {name}
                                            </option>
                                        ) : null
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))
                ) : null}
                </div>
                <div className="flex flex-col">
                {team2_5_1 ? (
                    props.team2Name.map((player, index) => (
                        <div key={index}>
                            <div className="flex items-center mb-2">
                                <label className="text-slate-200 w-5 font-bold mr-2">{["A:", "O:", "P:", "P:", "C:", "C:"][index]}</label>
                                <select
                                required
                                    className="mt-1 block md:w-24 w-20 px-4 py-1 border text-slate-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out hover:border-blue-500"
                                    value={team2Positions[index] || ""}
                                    onChange={(e) => {
                                        const newPositions = [...team2Positions];
                                        newPositions[index] = e.target.value;
                                        setTeam2Positions(newPositions);
                                    }}
                                >
                                    <option value="" hidden>
                                    </option>
                                    {props.team2Name.map((name, idx) => (
                                        !team2Positions.includes(props.team2Players[idx].toString()) || team2Positions[index] === props.team2Players[idx].toString() ? (
                                            <option key={idx} value={props.team2Players[idx]}>
                                                {name}
                                            </option>
                                        ) : null
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))
                ) : null}
                </div>
            </div>
            </>
            ) : null}
            {!ignoreforelo ? (
            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    onClick={() => {
                        setTeam("team1");
                        setShowGanador(!showGanador)
                        setNumber1(0);
                        setNumber2(0);
                        }
                    }
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
