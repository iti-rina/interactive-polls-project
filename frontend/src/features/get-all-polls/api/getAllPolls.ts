import axios from 'axios';
import type { PollValues } from '../../../shared';


export default async function getAllPolls(): Promise<PollValues> {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  try {
    return await axios.get(API_BASE_URL);
  } catch(error) {
    console.error(error);
    throw error;
  }
}