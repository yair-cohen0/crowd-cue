import { IArtist } from '../interfaces/artist.interface.ts';
import { API_URL, axiosInstance } from './index';

export const getArtists = async ({
    name,
    skip,
    limit,
}: {
    name: string | undefined;
    skip: number;
    limit: number;
}): Promise<IArtist[]> =>
    (
        await axiosInstance.get(`${API_URL}/artists${name ? '/spotify' : ''}`, {
            params: { name, skip, limit },
        })
    ).data as IArtist[];
