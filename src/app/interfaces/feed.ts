export interface FeedItem {
    id: string;
    name: string;
    releaseInfo: string;
    type: "series" | "movie" | null;
    poster: string;
    imdbRating: string;
    popularity: number;
}
