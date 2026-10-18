// Five-page preview journeys stay in v9; unavailable families use working legacy routes.
export const previewLinks: Record<string, string> = {
  '/': '/__v9/home',
  '/#proof': '/__v9/home#proof',
  '/#start': '/__v9/home#start',
  '/about': '/__v9/about',
  '/candidates': '/__v9/candidates',
  '/candidates#proof': '/__v9/candidates#proof',
  '/candidates#controls': '/__v9/candidates#controls',
  '/candidates#when': '/__v9/candidates#when',
  '/candidates#apply': '/__v9/candidates#apply',
  '/case-study': '/services',
  '/how-we-work-with-numbers': '/__v9/about',
  '/dpa': '/privacy',
};
