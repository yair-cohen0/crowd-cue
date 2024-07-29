import { API_URL, axiosInstance } from './index';
import { IGenre } from 'types';

export const getGenres = async ({
    name,
    skip,
    limit,
}: {
    name: string | undefined;
    skip: number;
    limit: number;
}): Promise<IGenre[]> =>
    (
        await axiosInstance.get(`${API_URL}/genres`, {
            params: { name, skip, limit },
        })
    ).data as IGenre[];
