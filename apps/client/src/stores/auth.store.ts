import { create } from 'zustand';

interface IAuthStore {
    token: string;
    setToken: (token: string) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    token: null,
    setToken: (token) =>
        set((state) => {
            state.token = token;
            return state;
        }),
}));
