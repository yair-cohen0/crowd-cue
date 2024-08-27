import { SelectionObject } from 'types';
import { create } from 'zustand';

interface ISelectionStore {
    selection: SelectionObject;
    select: (id: string, type: 'genre' | 'artist') => void;
    unselect: (id: string, type: 'genre' | 'artist') => void;
}

export const useSelectionStore = create<ISelectionStore>((set) => ({
    selection: {
        artists: [],
        genres: [],
    },
    select: (id, type) =>
        set((state) => {
            if (type === 'genre') {
                state.selection.genres.push(id);
            } else if (type === 'artist') {
                state.selection.artists.push(id);
            }
            return state;
        }),
    unselect: (id, type) =>
        set((state) => {
            if (type === 'genre') {
                state.selection.genres = state.selection.genres.filter((g) => g !== id);
            } else if (type === 'artist') {
                state.selection.artists = state.selection.artists.filter((a) => a !== id);
            }
            return state;
        }),
}));
