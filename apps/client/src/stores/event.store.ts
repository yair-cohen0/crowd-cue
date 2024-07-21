import { create } from 'zustand';
import { IEvent } from '../interfaces/event.interface.ts';

interface IEventStore {
    event: IEvent;
    token: string;
    setEvent: (event: IEvent) => void;
    setToken: (token: string) => void;
}

export const useEventStore = create<IEventStore>((set) => ({
    event: null,
    token: null,
    setEvent: (event) =>
        set((state) => {
            state.event = event;
            return state;
        }),
    setToken: (token) =>
        set((state) => {
            localStorage.setItem('token', token);
            state.token = token;
            return state;
        }),
}));
