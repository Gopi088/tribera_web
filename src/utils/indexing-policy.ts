export function shouldNoIndex({
  dev = false,
  context,
  url,
  noindex = false,
}: {
  dev?: boolean;
  context?: string;
  url?: string;
  noindex?: boolean;
}) {
  return dev || context !== 'production' || (url !== undefined && url.includes('netlify.app')) || noindex;
}
