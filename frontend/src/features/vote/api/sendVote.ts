import axios from 'axios';

type ActionValues = 'INCREMENT' | 'DECREMENT';

export default async function sendVote(id: number, answerId: number, actionType: ActionValues = 'INCREMENT') {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  try {
    return await axios({
      method: 'post',
      url: `${API_BASE_URL}/${id}/vote`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        answer_id: answerId,
        action: actionType
      })
    });
  } catch(error) {
    console.error(error);
    throw error;
  }
}