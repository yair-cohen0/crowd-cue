export type IArtist = {
    id: string;
    name: string;
    picture: string;
    spotifyId: string;
    genres: string[];
    popularity: number;
};

export type IGenre = {
    id: string;
    name: string;
    picture: Buffer;
};
