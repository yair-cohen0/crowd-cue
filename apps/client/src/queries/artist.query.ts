import { IArtist } from '../interfaces/artist.interface.ts';
import { API_URL, axiosInstance } from './index';

export const getArtists = async ({
    term,
    skip,
    limit,
}: {
    term: string | undefined;
    skip: number;
    limit: number;
}): Promise<IArtist[]> =>
    (
        await axiosInstance.get(`${API_URL}/artist${term ? `/${term}` : ''}`, {
            params: { skip, limit },
        })
    ).data as IArtist[];
