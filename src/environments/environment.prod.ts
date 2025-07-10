export const environment = {
  production: true,
  url: 'https://lovely-api-38om.onrender.com',
  feedUrl: 'https://cinemeta-catalogs.strem.io/feed.json',
  torrentUrl: (tt: string) => `https://torrentio.strem.fun/sort=seeders/stream/movie/${tt}.json`,
  metadaDataUrl: (type: 'series' | 'movie', tt: string) => `https://v3-cinemeta.strem.io/meta/${type}/${tt}.json`,
  searchUrl: (type: 'series' | 'movie', tt: string) => `https://v3-cinemeta.strem.io/catalog/${type}/top/search=${tt}.json`
};