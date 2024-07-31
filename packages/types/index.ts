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

export type SelectionTypes = 'artists' | 'genres';
export type ContactMethod = 'sms' | 'email';
export type Selection = { [key in SelectionTypes]: string[] };
export type IVoter = {
    contactMethod: ContactMethod;
    didVote: boolean;
    selection: Selection;
};

export type IEvent = {
    id: string;
    name: string;
    color: string;
    genres: string[];
    voters: Record<string, IVoter>;
    votes: { [key in SelectionTypes]: Record<string, number> };
};
