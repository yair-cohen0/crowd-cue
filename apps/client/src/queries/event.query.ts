import { API_URL, axiosInstance } from './index';
import { IEvent } from 'types';

export const getEvent = async (token: string): Promise<IEvent> =>
    (await axiosInstance.get(`${API_URL}/events/token/${token}`)).data as IEvent;
