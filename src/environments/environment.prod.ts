export const environment = {
  production: true,
  filminhoUrl: 'https://sa-east-1.aws.data.mongodb-api.com/app/application-0-jmmnknk/endpoint',
  feedUrl: 'https://cinemeta-catalogs.strem.io/feed.json',
  metadaDataUrl: (tt: string) => `https://v3-cinemeta.strem.io/meta/movie/${tt}.json`
};
