import axios from 'axios';
import type { CreatePollValues } from '../../../shared';

type PromiseValues = {
  'id': number;
  'text': string;
  'total_votes': number
}

export default async function createNewPoll(pollData: CreatePollValues): Promise<PromiseValues> {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  try {
    return await axios({
      method: 'post',
      url: API_BASE_URL,
      data: JSON.stringify(pollData)
    });
  } catch(error) {
    console.error(error);
    throw error;
  }
}