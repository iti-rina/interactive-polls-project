import axios from 'axios';

type PromiseValues = {
  'id': number;
  'text': string;
  'total_votes': number
}

export default async function deletePoll(id: number): Promise<PromiseValues> {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  try {
    return await axios({
      method: 'delete',
      url: `${API_BASE_URL}/${id}`
    });
  } catch(error) {
    console.error(error);
    throw error;
  }
}