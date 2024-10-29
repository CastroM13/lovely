interface Trailer {
    source: string;
    type: string;
}

interface TrailerStream {
    title: string;
    ytId: string;
}

export interface Link {
    name: string;
    category: string;
    url: string;
}

export interface Popularities {
    moviedb: number;
    stremio: number;
    stremio_lib: number;
    trakt: number;
}

export interface BehaviorHints {
    defaultVideoId: string;
    hasScheduledVideos: boolean;
}

export interface Video {
    name: string;
    season: number;
    number: number;
    firstAired: string;
    rating: string;
    id: string;
    overview: string;
    imdb_id: string;
}

export interface QueryMedia {
    id: string;
    imdb_id: string;
    type: string;
    name: string;
    releaseInfo: string;
    poster: string;
    links: [],
    behaviorHints: {
        defaultVideoId: number,
        hasScheduledVideos: boolean
    }
}


export interface MovieMetaData {
    meta: Meta;
}

export interface MovieSearchMetaData {
    metas: Meta[];
}

export interface Meta {
    imdb_id: string;
    name: string;
    type: "series" | "movie" | null;
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

export interface Magnet {
    name: string;
    title: string;
    infoHash: string;
    fileIdx: number;
    behaviorHints: {
        bingeGroup: string;
        filename: string;
    }
}