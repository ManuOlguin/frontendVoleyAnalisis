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

