import { create } from 'zustand';

interface ISelection {
    genres: string[];
    artists: string[];
}

interface ISelectionStore {
    selected: ISelection;
    select: (id: string, type: 'genre' | 'artist') => void;
    unselect: (id: string, type: 'genre' | 'artist') => void;
}

export const useSelectionStore = create<ISelectionStore>((set) => ({
    selected: {
        artists: [],
        genres: [],
    },
    select: (id, type) =>
        set((state) => {
            if (type === 'genre') {
                state.selected.genres.push(id);
            } else if (type === 'artist') {
                state.selected.artists.push(id);
            }
            return state;
        }),
    unselect: (id, type) =>
        set((state) => {
            if (type === 'genre') {
                state.selected.genres = state.selected.genres.filter((g) => g !== id);
            } else if (type === 'artist') {
                state.selected.artists = state.selected.artists.filter((a) => a !== id);
            }
            return state;
        }),
}));
