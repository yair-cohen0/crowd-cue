export type SelectionTypes = 'artists' | 'genres';
export type SelectionObject = { [key in SelectionTypes]: string[] };
export type Selection = Map<keyof SelectionObject, SelectionObject[SelectionTypes]>;
export interface IVoter {
    contactMethod: 'sms' | 'email';
    contactValue: string;
    didVote: boolean;
    selection: Partial<Selection>;
}

export interface IEvent {
    id: string;
    name: string;
    color: string;
    genres: string[];
    voters: Map<string, IVoter>;
    votes: Map<SelectionTypes, Map<string, number>>;
}
