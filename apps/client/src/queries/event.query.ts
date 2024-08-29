import { API_URL, axiosInstance } from './index';
import { IEvent } from 'types';

export const getEvent = async (): Promise<IEvent> =>
    (await axiosInstance.get(`${API_URL}/events/token`)).data as IEvent;
