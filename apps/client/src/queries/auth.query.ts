import { API_URL, axiosInstance } from './index';

export const auth = async (token: string): Promise<boolean> => {
    try {
        await axiosInstance.post(`${API_URL}/auth/${token}`);
        return true;
    } catch (e) {
        return false;
    }
};
