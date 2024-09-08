interface Trailer {
    source: string;
    type: string;
}

interface TrailerStream {
    title: string;
    ytId: string;
}

interface Link {
    name: string;
    category: string;
    url: string;
}

interface Popularities {
    moviedb: number;
    stremio: number;
    stremio_lib: number;
    trakt: number;
}

interface BehaviorHints {
    defaultVideoId: string;
    hasScheduledVideos: boolean;
}

interface Video {
    name: string;
    season: number;
    number: number;
    firstAired: string;
    rating: string;
    id: string;
    overview: string;
    imdb_id: string;
}


export interface MovieMetaData {
    meta: Meta;
}

export interface Meta {
    imdb_id: string;
    name: string;
    type: string;
    cast: string[];
    country: string;
    description: string;
    director: string[];
    genre: string[];
    imdbRating: string;
    released: string;
    slug: string;
    writer: string[];
    year: string;
    moviedb_id: number;
    popularities: Popularities;
    poster: string;
    runtime: string;
    trailers: Trailer[];
    background: string;
    logo: string;
    popularity: number;
    id: string;
    genres: string[];
    releaseInfo: string;
    trailerStreams: TrailerStream[];
    links: Link[];
    videos: Video[];
    behaviorHints: BehaviorHints;
}
