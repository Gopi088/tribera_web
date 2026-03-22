const rateLimitStore = new Map();

const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:3000', 'https://tribera.ai', 'https://www.tribera.ai'];

const getRequestHost = (event) => event.headers?.host || event.headers?.Host || '';

export const resetRateLimitStore = () => {
  rateLimitStore.clear();
};

export const getAllowedOrigins = () =>
  String(process.env.ALLOWED_FORM_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

export const validateRequestOrigin = (event) => {
  const allowedOrigins = new Set(getAllowedOrigins());
  const originHeader = event.headers?.origin || event.headers?.Origin;
  const refererHeader = event.headers?.referer || event.headers?.Referer;
  const candidate = originHeader || refererHeader;
  const requestHost = getRequestHost(event);

  if (!candidate) {
    return { ok: false, message: 'Invalid request origin.' };
  }

  try {
    const url = new URL(candidate);
    if (requestHost && url.host === requestHost) {
      return { ok: true };
    }

    return allowedOrigins.has(url.origin) ? { ok: true } : { ok: false, message: 'Invalid request origin.' };
  } catch {
    return { ok: false, message: 'Invalid request origin.' };
  }
};

const getClientIp = (event) => {
  const forwardedFor = event.headers?.['x-forwarded-for'] || event.headers?.['X-Forwarded-For'];
  if (forwardedFor) return String(forwardedFor).split(',')[0].trim();
  return event.headers?.['client-ip'] || event.headers?.['Client-IP'] || 'unknown';
};

export const enforceRateLimit = (event, scope) => {
  const maxRequests = Number(process.env.FORM_RATE_LIMIT_MAX || 10);
  const windowMs = Number(process.env.FORM_RATE_LIMIT_WINDOW_MS || 60_000);
  const now = Date.now();
  const key = `${scope}:${getClientIp(event)}`;
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= maxRequests) {
    return { ok: false, statusCode: 429, message: 'Too many requests. Please try again shortly.' };
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return { ok: true };
};
