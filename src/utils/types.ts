export type Player = {
    prota: boolean;
    elo: number | null;
    id: number;
    name: string;
  };

  export type Player2 = {
    prota: boolean;
    elo: number | null;
    id: number;
    name: string;
    winPercentage: number;
    losePercentage: number;
    setsWon: number;
    setsLost: number;
  };

  export type EloHistory = {
    change: number;
    player_id: number;
  };

  export type Set = {
    id: number;
    set_order: number;
    elo_history: EloHistory[];
    team1_score: number;
    team2_score: number;
    winner_known: number;
  };

  export type TeamPlayer = {
    players: Player;
    player_id: number;
  };

  export type Team = {
    id: number;
    team_number: number;
    team_player: TeamPlayer[];
  };

  export type Match = {
    id: number;
    date: string;
    season_id: number;
    sets: Set[];
    teams: Team[];
  };