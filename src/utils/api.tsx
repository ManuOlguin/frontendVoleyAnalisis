import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Example: Fetch all players
export const fetchPlayers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/fullPlayers`);
    console.log('Players:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

export const submitMatchData = async (matchData: any) => {
    try {

        const matchDataBro = {
            date: matchData.date,
            team1Players: matchData.team1Players, // Example player IDs for team 1
            team2Players: matchData.team2Players, // Example player IDs for team 2
            sets: matchData.setsData.map((set: any, index: number) => {
                let winner;
                if (set.team1Score === 0 && set.team2Score === 0) {
                    winner = set.winner;
                } else {
                    winner = set.team1Score > set.team2Score ? 'team1' : 'team2';
                }
                return {
                    team1_score: set.team1Score,
                    team2_score: set.team2Score,
                    winner: winner,
                    ignore_for_elo: set.ignore_for_elo,
                    set_order: index + 1,
                };
            }),
                // Add more sets as needed
            
        };

        //const response = await axios.post(`${API_BASE_URL}/api/addMatch`, matchData);
        console.log('Match submitted:', matchData);
        console.log('Match submitted:', matchDataBro);
    } catch (error) {
        console.error('Error submitting match:', error);
        throw error;
    }
    }
    
