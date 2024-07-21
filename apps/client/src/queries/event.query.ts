import axios from 'axios';
import { API_URL } from './index';
import { IEvent } from '../interfaces/event.interface.ts';

export const getEvent = async (token: string): Promise<IEvent> =>
    (await axios.get(`${API_URL}/event/info/${token}`)).data as IEvent;
