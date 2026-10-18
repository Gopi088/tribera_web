import { setTimeout as delay } from 'node:timers/promises';

// Keep the polling clock in Node: disabled-JavaScript contexts may never execute
// a second browser-scheduled predicate, even after native rendering finishes.
async function pollFromNode(read, isReady, timeout, makeError) {
  if (!Number.isFinite(timeout) || timeout <= 0) throw new TypeError('Readiness timeout must be positive');
  const deadline = performance.now() + timeout;
  let lastValue = null;
  while (performance.now() < deadline) {
    let timer;
    try {
      lastValue = await Promise.race([
        read(),
        new Promise((_, reject) => {
          timer = setTimeout(() => reject(makeError(lastValue)), Math.max(0, deadline - performance.now()));
        }),
      ]);
    } finally {
      clearTimeout(timer);
    }
    if (performance.now() >= deadline) throw makeError(lastValue);
    if (isReady(lastValue)) return lastValue;
    await delay(Math.min(50, Math.max(0, deadline - performance.now())));
  }
  throw makeError(lastValue);
}

// Like waitForFunction, this retries until the predicate is truthy. Returns the
// serialized value rather than a JSHandle. Evaluation failures propagate.
export async function waitForPageCondition(page, predicate, arg, { timeout = 30000 } = {}) {
  return pollFromNode(
    () => page.evaluate(predicate, arg),
    Boolean,
    timeout,
    (lastValue) => {
      const error = new Error(`Page condition not met within ${timeout}ms; last value: ${JSON.stringify(lastValue)}`);
      error.name = 'PageConditionTimeoutError';
      error.lastValue = lastValue;
      return error;
    }
  );
}

export async function waitForFonts(page, { timeout = 15000 } = {}) {
  await pollFromNode(
    () =>
      page.evaluate(() => ({
        status: document.fonts.status,
        faces: [...document.fonts]
          .filter((face) => face.status === 'loading' || face.status === 'error')
          .map((face) => ({ family: face.family, style: face.style, weight: face.weight, status: face.status })),
      })),
    (state) => state.status === 'loaded',
    timeout,
    (lastState) => {
      const error = new Error(`Fonts not ready within ${timeout}ms; last state: ${JSON.stringify(lastState)}`);
      error.name = 'FontReadinessTimeoutError';
      error.fontState = lastState;
      return error;
    }
  );
}
