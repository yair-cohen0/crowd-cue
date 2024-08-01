import axios from 'axios';
import { API_URL } from './index';
import { IEvent } from 'types';

export const getEvent = async (token: string): Promise<IEvent> =>
    (await axios.get(`${API_URL}/events/token/${token}`)).data as IEvent;
