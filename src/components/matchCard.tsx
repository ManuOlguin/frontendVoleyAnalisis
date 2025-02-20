import React, { useState, useEffect } from "react";

interface MatchCardProps {
  data: any;
}

const MatchCard: React.FC<MatchCardProps> = (props) => {
  const team1 = props.data.teams.find((t: any) => t.team_number === 1);
  const team2 = props.data.teams.find((t: any) => t.team_number === 2);
  console.log("team1", team1.team_player[0].player_id);
  return (
    <div className=" p-4 w-full">
        <h1 className="text-2xl font-bold text-slate-500"> {props.data.date}</h1>

      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-500">TEAMS</th>
            {props.data.sets.map((set: any) => (
              <th key={set.id} className="border px-4 py-2 bg-gray-400">
                Set {set.set_order}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Team 1 Players */}
          <tr>
            <td
              rowSpan={props.data.sets.length -1}
              className="border px-5 py-4 font-semibold bg-blue-900"
            >
              {team1.team_player.map((p: any) => (
                <div key={p.players.id}>{p.players.name}</div>
              ))}
            </td>
          </tr>

          {/* Team 1 Scores */}
          <tr>
            {props.data.sets.map((set: any) => {
              const isWinner = set.winner_known === 1;
              return (
                <td
                  key={set.id}
                  className={`border px-5 py-4 text-center ${
                    isWinner ? "bg-green-500" : "bg-red-400"
                  }`}
                >
                  <div className="text-lg font-bold">
                    {set.team1_score} pts.
                  </div>
                  <div className="text-sm">
                    {isWinner
? `+${set.elo_history.find((e: any) => e.player_id === team1.team_player[0].player_id).change.toFixed(1)} elo`
: `${set.elo_history.find((e: any) => e.player_id === team1.team_player[0].player_id).change.toFixed(1)} elo`}
                  </div>
                </td>
              );
            })}
          </tr>
          {/* Team 2 Players */}
          <tr>
            <td
              rowSpan={team2.team_player.length}
              className="border px-5 py-4 font-semibold bg-orange-800"
            >
              {team2.team_player.map((p: any) => (
                <div key={p.players.id}>{p.players.name}</div>
              ))}
            </td>
          </tr>
          {/* Team 2 Scores */}
          <tr>
            {props.data.sets.map((set: any) => {
              const isWinner = set.winner_known === 2;
              return (
                <td
                  key={set.id}
                  className={`border px-4 py-2 text-center ${
                    isWinner ? "bg-green-500" : "bg-red-400"
                  }`}
                >
                  <div className="text-lg font-bold">
                    {set.team2_score} pts.
                  </div>
                  <div className="text-sm">
                    {isWinner
                        ? `+${set.elo_history.find((e: any) => e.player_id === team2.team_player[0].player_id).change.toFixed(1)} elo`
                        : `${set.elo_history.find((e: any) => e.player_id === team2.team_player[0].player_id).change.toFixed(1)} elo`}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MatchCard;
