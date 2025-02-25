
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
          <tr >
            <th className="border px-4 py-2 bg-gray-500"></th>
            <th className="border px-4 py-4 bg-blue-900 text-left">
              {team1.team_player.map((p: any) => (
                <div className="w-32" key={p.players.id}>{p.players.name}</div>
              ))}
              ({((team1.team_player.reduce((total: number, player: any) => total + player.players.elo, 0) / team1.team_player.length) - props.data.sets.reduce((total: number, set: any) => {
                return total + set.elo_history.find((e: any) => e.player_id === team1.team_player[0].player_id).change;
              }, 0)).toFixed(1)} elo)
            </th>
            <th className="border px-4 py-2 bg-orange-800 text-left">
              {team2.team_player.map((p: any) => (
                <div className="w-32" key={p.players.id}>{p.players.name}</div>
              ))}
              ({((team2.team_player.reduce((total: number, player: any) => total + player.players.elo, 0) / team2.team_player.length) - props.data.sets.reduce((total: number, set: any) => {
                return total + set.elo_history.find((e: any) => e.player_id === team2.team_player[0].player_id).change;
              }, 0)).toFixed(1)} elo)</th>
          </tr>
        </thead>
        <tbody>
          {props.data.sets.map((set: any) => {
            const team1IsWinner = set.winner_known === 1;
            const team2IsWinner = set.winner_known === 2;
            return (
              <tr key={set.id}>
                <td className="border px-4 py-2  bg-gray-400">Set {set.set_order}</td>
                <td className={`border px-5 py-4  ${team1IsWinner ? "bg-green-500" : "bg-red-400"}`}>
                  <div className="text-lg font-bold">{set.team1_score} pts.</div>
                  <div className="text-sm">
                    {team1IsWinner
                      ? `+${set.elo_history.find((e: any) => e.player_id === team1.team_player[0].player_id).change.toFixed(1)} elo`
                      : `${set.elo_history.find((e: any) => e.player_id === team1.team_player[0].player_id).change.toFixed(1)} elo`}
                  </div>
                </td>
                <td className={`border px-4 py-2 ${team2IsWinner ? "bg-green-500" : "bg-red-400"}`}>
                  <div className="text-lg font-bold">{set.team2_score} pts.</div>
                  <div className="text-sm">
                    {team2IsWinner
                      ? `+${set.elo_history.find((e: any) => e.player_id === team2.team_player[0].player_id).change.toFixed(1)} elo`
                      : `${set.elo_history.find((e: any) => e.player_id === team2.team_player[0].player_id).change.toFixed(1)} elo`}
                  </div>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="border px-4 py-2 bg-gray-400">Total</td>
            <td className={`border font-bold px-5 py-4  ${props.data.sets.reduce((total: number, set: any) => {
                    return total + set.elo_history.find((e: any) => e.player_id === team1.team_player[0].player_id).change;
                    }, 0) < 0 ? "bg-red-500" : "bg-green-600"}`}>
                    {props.data.sets.reduce((total: number, set: any) => {
                    return total + set.elo_history.find((e: any) => e.player_id === team1.team_player[0].player_id).change;
                    }, 0).toFixed(1)} elo
                  </td>
           <td className={`border px-5 py-4 font-bold  ${props.data.sets.reduce((total: number, set: any) => {
                    return total + set.elo_history.find((e: any) => e.player_id === team2.team_player[0].player_id).change;
                    }, 0) < 0 ? "bg-red-500" : "bg-green-600"}`}>
                    {props.data.sets.reduce((total: number, set: any) => {
                    return total + set.elo_history.find((e: any) => e.player_id === team2.team_player[0].player_id).change;
                    }, 0).toFixed(1)} elo
                  </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default MatchCard;
