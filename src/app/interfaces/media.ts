interface Remarks {
    [x: string]: number;
}

interface Reviews {
    [x: string]: string;
}

export const MediaStatus = {
    PENDING: "To Watch",
    WATCHING: "In Progress",
    WATCHED: "Watched"
} as const;

export type MediaStatusType = (typeof MediaStatus)[keyof typeof MediaStatus];

export interface Media {
    id: string | null;
    Title?: string | null;
    Timestamp?: string | null;
    Ownership?: string | null;
    Year?: string | null;
    Type?: string | null;
    Poster?: string | null;
    imdbID?: string | null;
    Remarks?: Remarks | null;
    WatchedEpisodes?: string[] | null;
    Status?: MediaStatusType | null;
    __v: number;
    Reviews?: Reviews | null;
}
