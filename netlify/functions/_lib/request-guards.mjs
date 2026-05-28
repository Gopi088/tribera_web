const rateLimitStore = new Map();

const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:3000', 'https://tribera.ai', 'https://www.tribera.ai'];
const DEFAULT_TRUSTED_HOST_PATTERNS = [
  'localhost:3000',
  '*.tribera.ai',
  '*--tribera.netlify.app',
  'tribera.netlify.app',
];

const getRequestHost = (event) => event.headers?.host || event.headers?.Host || '';
const getHeaderValue = (event, ...headerNames) => {
  for (const headerName of headerNames) {
    const value = event.headers?.[headerName];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  return '';
};

const isValidIpToken = (value) => /^[a-fA-F0-9:.]+$/.test(String(value || '').trim());
const isProductionRuntime = () => {
  const context = String(process.env.CONTEXT || process.env.NETLIFY_CONTEXT || '')
    .trim()
    .toLowerCase();
  const nodeEnv = String(process.env.NODE_ENV || '')
    .trim()
    .toLowerCase();
  return context === 'production' || nodeEnv === 'production';
};

export const resetRateLimitStore = () => {
  rateLimitStore.clear();
};

export const getAllowedOrigins = () =>
  String(process.env.ALLOWED_FORM_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

const getTrustedHostPatterns = () =>
  String(process.env.ALLOWED_FORM_HOST_PATTERNS || DEFAULT_TRUSTED_HOST_PATTERNS.join(','))
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

const hostMatchesPattern = (host, pattern) => {
  if (!host || !pattern) return false;
  if (pattern.startsWith('*.')) {
    return host === pattern.slice(2) || host.endsWith(pattern.slice(1));
  }

  if (pattern.startsWith('*')) {
    return host.endsWith(pattern.slice(1));
  }

  if (pattern.startsWith('.')) {
    return host === pattern.slice(1) || host.endsWith(pattern);
  }

  return host === pattern;
};

const isTrustedRequestHost = (host, allowedOrigins) => {
  const normalizedHost = String(host || '').toLowerCase();
  if (!normalizedHost) return false;

  for (const origin of allowedOrigins) {
    try {
      if (new URL(origin).host.toLowerCase() === normalizedHost) {
        return true;
      }
    } catch {
      // Ignore malformed origins in env and continue evaluating the rest.
    }
  }

  return getTrustedHostPatterns().some((pattern) => hostMatchesPattern(normalizedHost, pattern));
};

export const validateRequestOrigin = (event) => {
  const allowedOrigins = getAllowedOrigins();
  const allowedOriginSet = new Set(allowedOrigins);
  const originHeader = event.headers?.origin || event.headers?.Origin;
  const refererHeader = event.headers?.referer || event.headers?.Referer;
  const candidate = originHeader || refererHeader;
  const requestHost = getRequestHost(event);

  if (!candidate) {
    return { ok: false, message: 'Invalid request origin.' };
  }

  try {
    const url = new URL(candidate);
    if (allowedOriginSet.has(url.origin)) {
      return { ok: true };
    }

    if (requestHost && url.host === requestHost && isTrustedRequestHost(requestHost, allowedOrigins)) {
      return { ok: true };
    }

    return { ok: false, message: 'Invalid request origin.' };
  } catch {
    return { ok: false, message: 'Invalid request origin.' };
  }
};

const getClientIp = (event) => {
  const authoritativeIp = getHeaderValue(event, 'x-nf-client-connection-ip', 'X-Nf-Client-Connection-Ip');

  if (authoritativeIp && isValidIpToken(authoritativeIp)) {
    return authoritativeIp;
  }

  const forwardedFor = getHeaderValue(event, 'x-forwarded-for', 'X-Forwarded-For');
  if (forwardedFor && !isProductionRuntime()) {
    const forwardedIps = forwardedFor
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    const candidateIp = forwardedIps.at(-1);

    if (candidateIp && isValidIpToken(candidateIp)) {
      return candidateIp;
    }
  }

  return 'unknown';
};

const enforceLocalRateLimit = (key, maxRequests, windowMs) => {
  const now = Date.now();
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

const getRateLimitTimeoutMs = () => Number(process.env.FORM_RATE_LIMIT_TIMEOUT_MS || 3000);

const enforceSharedRateLimit = async ({ key, scope, maxRequests, windowMs }) => {
  const rateLimitUrl = String(process.env.FORM_RATE_LIMIT_SHARED_URL || '').trim();
  if (!rateLimitUrl) {
    return null;
  }

  const headers = { 'Content-Type': 'application/json' };
  const token = String(process.env.FORM_RATE_LIMIT_SHARED_TOKEN || '').trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(rateLimitUrl, {
    method: 'POST',
    headers,
    signal: AbortSignal.timeout(getRateLimitTimeoutMs()),
    body: JSON.stringify({
      key,
      scope,
      maxRequests,
      windowMs,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shared rate limiter responded with status ${response.status}.`);
  }

  const payload = await response.json().catch(() => null);
  if (!payload || typeof payload.ok !== 'boolean') {
    throw new Error('Shared rate limiter returned an invalid response.');
  }

  return payload.ok
    ? { ok: true }
    : {
        ok: false,
        statusCode: Number(payload.statusCode) || 429,
        message: payload.message || 'Too many requests. Please try again shortly.',
      };
};

export const enforceRateLimit = async (event, scope) => {
  const maxRequests = Number(process.env.FORM_RATE_LIMIT_MAX || 10);
  const windowMs = Number(process.env.FORM_RATE_LIMIT_WINDOW_MS || 60_000);
  const key = `${scope}:${getClientIp(event)}`;
  try {
    const sharedResult = await enforceSharedRateLimit({ key, scope, maxRequests, windowMs });
    if (sharedResult) {
      return sharedResult;
    }
  } catch {
    if (isProductionRuntime()) {
      return { ok: false, statusCode: 429, message: 'Too many requests. Please try again shortly.' };
    }
  }

  return enforceLocalRateLimit(key, maxRequests, windowMs);
};
