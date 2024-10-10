import axios from 'axios';
import { User } from '../utils/interfaces/users';
import { ENDPOINTS } from '../utils/constants';

// @TODO: Move in ENV - BASE_JSON_PLACEHOLDER_URL
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>(ENDPOINTS.USERS.INDEX);
  return response.data;
};

// @TODO: fix the /path to be a constant
export const fetchPosts = async (userId: number) => {
  const response = await apiClient.get(`/posts?userId=${userId}`);
  return response.data;
};

export const fetchTasks = async () => {
  const response = await apiClient.get(ENDPOINTS.TASKS.INDEX);
  return response.data;
};
