export interface IArtist {
    id: string;
    name: string;
    picture: string;
    spotify_id: string;
    genres: string[];
}

export interface IGenre {
    id: string;
    name: string;
    picture: Buffer;
}
