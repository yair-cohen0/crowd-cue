import { API_URL, axiosInstance } from './index';

export const auth = async (token: string): Promise<void> => await axiosInstance.post(`${API_URL}/auth?token=${token}`);
