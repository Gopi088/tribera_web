import { setTimeout as delay } from 'node:timers/promises';

// No browser timers: disabled-JavaScript contexts may never execute a second
// waitForFunction predicate, even after the native font loader has finished.
export async function waitForFonts(page, { timeout = 15000 } = {}) {
  if (!Number.isFinite(timeout) || timeout <= 0) throw new TypeError('Font timeout must be positive');
  const deadline = performance.now() + timeout;
  let lastState = null;
  const timeoutError = () => {
    const error = new Error(`Fonts not ready within ${timeout}ms; last state: ${JSON.stringify(lastState)}`);
    error.name = 'FontReadinessTimeoutError';
    error.fontState = lastState;
    return error;
  };
  while (performance.now() < deadline) {
    let timer;
    try {
      lastState = await Promise.race([
        page.evaluate(() => ({
          status: document.fonts.status,
          faces: [...document.fonts]
            .filter((face) => face.status === 'loading' || face.status === 'error')
            .map((face) => ({ family: face.family, style: face.style, weight: face.weight, status: face.status })),
        })),
        new Promise((_, reject) => {
          timer = setTimeout(() => reject(timeoutError()), Math.max(0, deadline - performance.now()));
        }),
      ]);
    } finally {
      clearTimeout(timer);
    }
    if (performance.now() >= deadline) throw timeoutError();
    if (lastState.status === 'loaded') return;
    await delay(Math.min(50, Math.max(0, deadline - performance.now())));
  }
  throw timeoutError();
}
