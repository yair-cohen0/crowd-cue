import { IGenre } from '../interfaces/genre.interface.ts';
import { API_URL, axiosInstance } from './index';

export const getGenres = async ({
    term,
    skip,
    limit,
}: {
    term: string | undefined;
    skip: number;
    limit: number;
}): Promise<IGenre[]> =>
    (
        await axiosInstance.get(`${API_URL}/genre${term ? `/${term}` : ''}`, {
            params: { skip, limit },
        })
    ).data as IGenre[];
