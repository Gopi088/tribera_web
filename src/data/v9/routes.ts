/** Resolve reviewed links for public pages while retaining private preview journeys. */
export function v9Href(href: string, pathname: string): string {
  if (pathname.startsWith('/__v9/')) return href;
  return href
    .replace(/^\/__v9\/home(?=[?#]|$)/, '/')
    .replace(/^\/__v9\/bfsi(?=[?#]|$)/, '/industries/banking-financial-services')
    .replace(/^\/__v9\/article(?=[?#]|$)/, '/blog/seventeen-interviews-one-hire')
    .replace(/^\/__v9(?=\/)/, '');
}
