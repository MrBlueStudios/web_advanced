const callsPerIp = new Map();
const WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

setInterval(() => {
  callsPerIp.clear();
}, WINDOW_MS).unref();

export const rateLimitingMiddleware = (req, res, next) => {
  const now = Date.now();
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';

  const entry = callsPerIp.get(ip) ?? { count: 0, resetTime: now + WINDOW_MS };

  if (now > entry.resetTime) {
    entry.count = 0;
    entry.resetTime = now + WINDOW_MS;
  }

  entry.count += 1;
  callsPerIp.set(ip, entry);

  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    res.setHeader('Retry-After', retryAfter);
    return res.status(429).json({
      error: 'Too many requests. Limit is 10 requests per day.',
      retryAfterSeconds: retryAfter,
    });
  }

  return next();
};

export const resetRateLimiter = () => {
  callsPerIp.clear();
};
