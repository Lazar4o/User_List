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

export const fetchPosts = async () => {
  const response = await apiClient.get(ENDPOINTS.POSTS.INDEX);
  return response.data;
};

export const fetchTasks = async () => {
  const response = await apiClient.get(ENDPOINTS.TASKS.INDEX);
  return response.data;
};
