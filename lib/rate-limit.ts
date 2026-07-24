type Attempt = {
  count: number;
  resetAt: number;
};

declare global {
  var loginAttempts: Map<string, Attempt> | undefined;
}

const attempts = globalThis.loginAttempts ?? new Map<string, Attempt>();

if (!globalThis.loginAttempts) {
  globalThis.loginAttempts = attempts;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000;

export function checkLoginRateLimit(identifier: string) {
  const now = Date.now();
  const current = attempts.get(identifier);

  if (!current || current.resetAt <= now) {
    attempts.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function clearLoginAttempts(identifier: string) {
  attempts.delete(identifier);
}
