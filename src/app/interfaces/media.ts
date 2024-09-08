interface Remarks {
    jujuba: number;
    tito: number;
}

interface Reviews {
    jujuba: string;
    tito: string;
}

export interface Media {
    _id: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
    imdbID: string;
    Remarks: Remarks;
    Status: string;
    __v: number;
    Reviews: Reviews;
}
