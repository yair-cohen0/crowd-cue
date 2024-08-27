import { API_URL, axiosInstance } from './index';
import { SelectionObject } from 'types';

export const sendVote = async (token: string, selection: SelectionObject): Promise<void> =>
    await axiosInstance.post(`${API_URL}/events/vote/${token}`, selection);
