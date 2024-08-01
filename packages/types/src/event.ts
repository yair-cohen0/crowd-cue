export type SelectionTypes = 'artists' | 'genres';
export type Selection = { [key in SelectionTypes]: string[] };
export type IVoter = {
    contactMethod: 'sms' | 'email';
    contactValue: string;
    didVote: boolean;
    selection: Partial<Selection>;
};

export type IEvent = {
    id: string;
    name: string;
    color: string;
    genres: string[];
    voters: Record<string, IVoter>;
    votes: { [key in SelectionTypes]: Record<string, number> };
};
