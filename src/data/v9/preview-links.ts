import { v9Href } from './routes';
// Accepted private preview journeys stay in v9; unavailable families use working legacy routes.
export const previewLinks: Record<string, string> = {
  '/': '/__v9/home',
  '/#proof': '/__v9/home#proof',
  '/#start': '/__v9/home#start',
  '/industries': '/__v9/industries',
  '/intelligence': '/__v9/intelligence',
  '/about': '/__v9/about',
  '/candidates': '/__v9/candidates',
  '/candidates#proof': '/__v9/candidates#proof',
  '/candidates#controls': '/__v9/candidates#controls',
  '/candidates#when': '/__v9/candidates#when',
  '/candidates#apply': '/__v9/candidates#apply',
  '/contact': '/__v9/contact',
  '/sample-write-up': '/__v9/sample-write-up',
  '/services': '/__v9/services',
  '/interview-as-a-service': '/__v9/interview-as-a-service',
  '/case-study': '/__v9/case-study',
  '/how-we-work-with-numbers': '/__v9/about',
  '/dpa': '/dpa',
};

export const publicLinks = Object.fromEntries(
  Object.entries(previewLinks).map(([from, to]) => [from, v9Href(to, '/')])
);
