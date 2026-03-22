import assert from 'node:assert/strict';

export const createMultipartEvent = async ({ fields = {}, files = [], method = 'POST', headers = {} } = {}) => {
  const formData = new FormData();
  const normalizedFields = {
    form_loaded_at: String(Date.now() - 3000),
    ...fields,
  };

  for (const [name, value] of Object.entries(normalizedFields)) {
    formData.set(name, value);
  }

  for (const file of files) {
    formData.set(
      file.name,
      new File([file.content], file.filename, {
        type: file.type || 'application/octet-stream',
      })
    );
  }

  const request = new Request('http://localhost/.netlify/functions/test', {
    method,
    body: formData,
  });

  const body = Buffer.from(await request.arrayBuffer()).toString('base64');

  return {
    httpMethod: method,
    headers: {
      'content-type': request.headers.get('content-type'),
      ...headers,
    },
    body,
    isBase64Encoded: true,
  };
};

export const parseJsonResponse = (response) => {
  assert.equal(typeof response?.statusCode, 'number');
  return {
    statusCode: response.statusCode,
    body: JSON.parse(response.body),
  };
};

export const withMockedFetch = async (fn) => {
  const originalFetch = global.fetch;
  const calls = [];

  global.fetch = async (url, options = {}) => {
    calls.push({
      url,
      options,
      json: options.body ? JSON.parse(options.body) : undefined,
    });

    return {
      ok: true,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };

  try {
    return await fn(calls);
  } finally {
    global.fetch = originalFetch;
  }
};

export const withEnv = async (env, fn) => {
  const previous = new Map();

  for (const [key, value] of Object.entries(env)) {
    previous.set(key, process.env[key]);
    process.env[key] = value;
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (typeof value === 'undefined') {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
};
