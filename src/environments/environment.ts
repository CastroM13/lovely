export const environment = {
  production: false,
  neureloUrl: 'https://us-east-2.aws.neurelo.com/rest',
  neureloToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFybjphd3M6a21zOnVzLWVhc3QtMjowMzczODQxMTc5ODQ6YWxpYXMvYjJjYWNlYWItQXV0aC1LZXkifQ.eyJlbnZpcm9ubWVudF9pZCI6ImMyZWVlODI4LTRmNWUtNDcxMC04Y2M5LThiMDZjOWU2OWQxZCIsImdhdGV3YXlfaWQiOiJnd19iMmNhY2VhYi0yYTRlLTQ3YzYtOTlkZS1iNDM3M2I4NWE2MjIiLCJwb2xpY2llcyI6WyJSRUFEIiwiV1JJVEUiLCJVUERBVEUiLCJERUxFVEUiLCJDVVNUT00iXSwiaWF0IjoiMjAyNS0wMS0yOFQxMTo1NDoxMi4zNTkwNDEwNTdaIiwianRpIjoiOTQyZDE1MzQtOGRkMC00ODkyLTkwYmItN2I1ZGEzYWViMzkwIn0.2peDdi0HqrC5cvfxpWdYEcgU_arThJ_BZaSOqmdD6SNdfmo5_ZdGRCiNGESKIX-aWPIH_5UYvsUonUqmgV43zqiEn84_zu2K83xFXQMur70S_3ESyeFFj6aY-XmYzeuv8EyUv9KCjTU4K8_RPtGNCOHGImk6Hv0xUfVQUIyxTd1sfw3gb5YQ89HcnMPorJoAfrJYFwA63N2MJsIboDyjjIyBdBohOMRncnBQSqmOFbvja4inSuKzo83clCOVh07qU5aoMRGFml9bO_Oxbmp0paa98OPrYYy4oYnGlYUTUR_sas8i-0ZWWPNfDJz0WAKppTgyIX3-0OLM2V2H0oqDhw',
  feedUrl: 'https://cinemeta-catalogs.strem.io/feed.json',
  torrentUrl: (tt: string) => `https://torrentio.strem.fun/sort=seeders/stream/movie/${tt}.json`,
  metadaDataUrl: (type: 'series' | 'movie', tt: string) => `https://v3-cinemeta.strem.io/meta/${type}/${tt}.json`,
  searchUrl: (type: 'series' | 'movie', tt: string) => `https://v3-cinemeta.strem.io/catalog/${type}/top/search=${tt}.json`
};