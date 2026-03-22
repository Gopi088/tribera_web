#!/usr/bin/env bash

set -euo pipefail

TARGET_PORT="${TARGET_PORT:-4321}"
NETLIFY_PORT="${NETLIFY_PORT:-8888}"
ASTRO_HOST="${ASTRO_HOST:-127.0.0.1}"

ASTRO_PID=""

cleanup() {
  if [[ -n "${ASTRO_PID}" ]] && kill -0 "${ASTRO_PID}" 2>/dev/null; then
    pkill -TERM -P "${ASTRO_PID}" 2>/dev/null || true
    kill "${ASTRO_PID}" 2>/dev/null || true
    wait "${ASTRO_PID}" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

if lsof -iTCP:"${TARGET_PORT}" -sTCP:LISTEN -nP >/dev/null 2>&1; then
  echo "Port ${TARGET_PORT} is already in use. Stop the existing process before running Netlify dev." >&2
  exit 1
fi

npx astro dev --host "${ASTRO_HOST}" --port "${TARGET_PORT}" --strictPort &
ASTRO_PID=$!

for _ in $(seq 1 30); do
  if lsof -iTCP:"${TARGET_PORT}" -sTCP:LISTEN -nP >/dev/null 2>&1; then
    netlify dev --framework "#custom" -c "sleep 1000000" --target-port "${TARGET_PORT}" --port "${NETLIFY_PORT}" --functions netlify/functions --no-open
    exit $?
  fi

  if ! kill -0 "${ASTRO_PID}" 2>/dev/null; then
    echo "Astro dev server exited before opening port ${TARGET_PORT}." >&2
    exit 1
  fi

  sleep 1
done

echo "Timed out waiting for Astro dev server on port ${TARGET_PORT}." >&2
exit 1
