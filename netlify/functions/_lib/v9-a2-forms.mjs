import { validateRequestOrigin, enforceRateLimit } from './request-guards.mjs';
import crypto from 'node:crypto';
import fs from 'node:fs';
import {
  escapeHtml,
  json,
  normalizeFields,
  parseMultipartForm,
  validateSubmissionTiming,
  isValidEmail,
  validateResumeFile,
  inspectUploadedFile,
} from './form-utils.mjs';

export const SECTORS = [
  'banking-financial-services',
  'enterprise-technology',
  'product-saas',
  'ai-data',
  'cybersecurity',
  'healthcare-life-sciences',
  'pharmaceutical',
  'manufacturing',
  'industrial-engineering',
  'global-capability-centers',
  'consumer-digital-commerce',
  'private-equity-portfolio',
];
export const SERVICES = [
  'scorecard',
  'review',
  'perm',
  'contract',
  'exec',
  'managed',
  'iaas',
  'delivery',
  'bot',
  'team',
  'library',
  'process',
];
const TTL = 2 * 60 * 60 * 1000;
class Failure extends Error {
  constructor(message, status = 400, code = 'validation', retryable = false) {
    super(message);
    Object.assign(this, { status, code, retryable });
  }
}
const secret = () => {
  const value = process.env.FORM_REQUEST_TOKEN_SECRET || '';
  if (value.length < 32) throw new Failure('Form delivery is temporarily unavailable.', 503, 'configuration');
  return value;
};
const sign = (value) => crypto.createHmac('sha256', secret()).update(value).digest('base64url');
const mint = (kind) => {
  const at = Date.now();
  const payload = Buffer.from(JSON.stringify({ kind, at, id: crypto.randomUUID() })).toString('base64url');
  const min_submit_ms = Number(process.env.FORM_MIN_SUBMIT_MS || 1500);
  return {
    request_token: `${payload}.${sign(payload)}`,
    form_loaded_at: String(at),
    expires_at: at + TTL,
    min_submit_ms,
    ready_at: at + min_submit_ms,
  };
};
const verify = (kind, fields) => {
  const [payload, signature, ...rest] = String(fields.request_token || '').split('.');
  if (!payload || !signature || rest.length) throw new Failure('Invalid form token.');
  const expected = sign(payload);
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected)))
    throw new Failure('Invalid form token.');
  let token;
  try {
    token = JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch {
    throw new Failure('Invalid form token.');
  }
  if (
    token.kind !== kind ||
    !Number.isInteger(token.at) ||
    !/^[-a-f0-9]{36}$/.test(token.id) ||
    String(token.at) !== fields.form_loaded_at ||
    token.at > Date.now()
  )
    throw new Failure('Invalid form token.');
  if (Date.now() - token.at > TTL)
    throw new Failure(
      'This form has expired. Do not retry an earlier delivery with a new token; contact the team if its outcome is unknown.',
      400,
      'expired'
    );
  return token;
};
export const contextFrom = (values) => ({
  side: values.side === 'looking' ? 'looking' : 'hiring',
  sector: SECTORS.includes(values.sector) ? values.sector : '',
  service: SERVICES.includes(values.service) ? values.service : '',
  intent: values.intent === 'sample-write-up' ? 'sample-write-up' : '',
});
const getContext = (event) => {
  let values = {};
  const query = event.queryStringParameters || {};
  // A same-origin referrer supplies context only when no context query was explicit.
  if (!['side', 'sector', 'service', 'intent'].some((key) => Object.hasOwn(query, key))) {
    try {
      const ref = new URL(event.headers?.referer || event.headers?.Referer);
      const host = event.headers?.host || event.headers?.Host;
      const scheme =
        event.headers?.['x-forwarded-proto'] ||
        (host?.startsWith('localhost') || host?.startsWith('127.0.0.1') ? 'http' : 'https');
      if (ref.origin === `${scheme}://${host}`) values = Object.fromEntries(ref.searchParams);
    } catch {
      /* absent referrer */
    }
  } else values = query;
  return contextFrom(values);
};
const config = (kind) => {
  secret();
  const key = process.env.RESEND_API_KEY,
    from = process.env.RESEND_FROM;
  const hiring = process.env.CONTACT_HIRING_TO,
    looking = process.env.CONTACT_LOOKING_TO,
    lead = process.env.SAMPLE_LEADS_TO;
  if (!key || !from || (kind === 'sample' ? !isValidEmail(lead) : !isValidEmail(hiring) || !isValidEmail(looking)))
    throw new Failure('Form delivery is temporarily unavailable.', 503, 'configuration');
  return { key, from, hiring, looking, lead };
};
const send = async (cfg, key, body) => {
  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.key}`, 'Content-Type': 'application/json', 'Idempotency-Key': key },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({ from: cfg.from, ...body }),
    });
  } catch {
    throw new Failure(
      'Delivery outcome is uncertain. Retry this same request without changing its details.',
      503,
      'delivery',
      true
    );
  }
  const data = await response.json().catch(() => null);
  if (response.status === 409 && data?.name === 'invalid_idempotent_request')
    throw new Failure(
      'This request was already used with different details. The original may have been delivered; do not resend it as a new request.',
      409,
      'conflict'
    );
  if (!response.ok || !data || typeof data.id !== 'string' || !data.id)
    throw new Failure(
      'Delivery could not be confirmed. Retry this same request without changing its details.',
      response.status === 409 ? 409 : 503,
      'delivery',
      true
    );
};
const headers = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
  'Content-Security-Policy': "default-src 'none'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
};
const document = (body) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Tribera private form</title><meta name="robots" content="noindex,nofollow"></head><body><main>${body}</main></body></html>`;
const input = (name, label, value = '', required = false, type = 'text') =>
  `<p><label>${label} <input type="${type}" name="${name}" value="${escapeHtml(value)}" ${required ? 'required' : ''} maxlength="${name === 'email' ? 254 : 200}"></label></p>`;
const hidden = (name, value) => `<input type="hidden" name="${name}" value="${escapeHtml(value)}">`;
const select = (name, values, current) =>
  `<p><label>${name} <select name="${name}"><option value="">None</option>${values.map((value) => `<option ${value === current ? 'selected' : ''}>${escapeHtml(value)}</option>`).join('')}</select></label></p>`;
const formHtml = (kind, f, notice = '') => {
  const looking = f.side === 'looking';
  const fields =
    kind === 'sample'
      ? input('company', 'Company', f.company, true)
      : looking
        ? '<p><label>CV (PDF, DOC or DOCX, up to 10 MiB) <input name="cv" type="file" accept=".pdf,.doc,.docx" required></label></p><p>When retrying, select the same original CV again.</p>' +
          `<p><label>Note <textarea name="note" maxlength="4000">${escapeHtml(f.note || '')}</textarea></label></p>`
        : input('role', 'Role to hire', f.role, true) +
          input('company', 'Company', f.company, true) +
          `<p><label>Message <textarea name="message" maxlength="4000">${escapeHtml(f.message || '')}</textarea></label></p>`;
  const chooser =
    kind === 'contact'
      ? `<form method="get" action="/.netlify/functions/contact-form-v9"><label>Choose side <select name="side"><option value="hiring" ${!looking ? 'selected' : ''}>Hiring</option><option value="looking" ${looking ? 'selected' : ''}>Looking</option></select></label>${select('sector', SECTORS, f.sector)}${select('service', SERVICES, f.service)}${select('intent', ['sample-write-up'], f.intent)}<button type="submit">Open this form</button></form>`
      : '';
  return document(
    `<h1>${kind === 'sample' ? 'Request the sample write-up' : looking ? 'Contact the candidate team' : 'Contact the hiring team'}</h1><p>Private migration preview. Submitting sends your information to the Tribera team.${kind === 'sample' ? ' We email the sample and record this request, without subscribing you.' : ''}</p>${notice ? `<p role="alert">${escapeHtml(notice)}</p>` : ''}${notice ? '' : chooser}<form method="post" enctype="multipart/form-data" action="/.netlify/functions/${kind === 'sample' ? 'sample-request-v9' : 'contact-send-v9'}">${hidden('request_token', f.request_token)}${hidden('form_loaded_at', f.form_loaded_at)}${['side', 'sector', 'service', 'intent'].map((key) => hidden(key, f[key] || '')).join('')}<p hidden><label>Leave empty <input name="botcheck" tabindex="-1" autocomplete="off"></label></p>${kind === 'sample' ? hidden('website', '') : ''}${input('name', 'Name', f.name, true)}${input('email', 'Email', f.email, true, 'email')}${fields}<button type="submit">Submit${notice ? ' same request' : ''}</button></form><p>Do not open a new form to retry an uncertain delivery.</p><p><a href="/">Return to Tribera</a></p>`
  );
};
const wantsHtml = (event) =>
  (event.headers?.accept || event.headers?.Accept || '').includes('text/html') &&
  !(event.headers?.accept || event.headers?.Accept || '').includes('application/json');
export const createNativeHandler = (kind) => async (event) => {
  if (event.httpMethod !== 'GET') return json(405, { success: false, message: 'Method not allowed.' });
  try {
    if (event.queryStringParameters?.received === '1')
      return {
        statusCode: 200,
        headers,
        body: document(
          '<h1>Request received</h1><p>Your request was accepted. Please do not submit it again.</p><a href="/">Return to Tribera</a>'
        ),
      };
    config(kind);
    const f = { ...getContext(event), ...mint(kind) };
    if (event.queryStringParameters?.format === 'json')
      return json(200, { success: true, ...f, context: contextFrom(f) });
    return { statusCode: 200, headers, body: formHtml(kind, f) };
  } catch (error) {
    const response = json(error.status || 503, {
      success: false,
      message: error.message,
      code: error.code || 'configuration',
      retryable: false,
    });
    return wantsHtml(event) || event.queryStringParameters?.format !== 'json'
      ? { ...response, headers, body: document(`<h1>Form unavailable</h1><p>${escapeHtml(error.message)}</p>`) }
      : response;
  }
};
export const createSubmissionHandler = (kind) => async (event) => {
  let fields;
  const respond = (response) => {
    if (!wantsHtml(event)) return response;
    const result = JSON.parse(response.body);
    if (result.success)
      return {
        statusCode: 303,
        headers: { ...headers, Location: `/.netlify/functions/${kind}-form-v9?received=1` },
        body: '',
      };
    return {
      ...response,
      headers,
      body:
        fields && !['expired', 'conflict'].includes(result.code)
          ? formHtml(kind, fields, result.message)
          : document(`<h1>Request not completed</h1><p>${escapeHtml(result.message)}</p>`),
    };
  };
  if (event.httpMethod !== 'POST') return respond(json(405, { success: false, message: 'Method not allowed.' }));
  try {
    const cfg = config(kind);
    const origin = validateRequestOrigin(event);
    if (!origin.ok) throw new Failure(origin.message);
    const rate = await enforceRateLimit(event, `${kind}-v9`);
    if (!rate.ok) throw new Failure(rate.message, rate.statusCode, 'rate_limit', true);
    let checks;
    try {
      checks = await parseMultipartForm(event, { rejectExtraFiles: true });
    } catch (error) {
      throw new Failure(error.message || 'Invalid form data.', error.statusCode || 400);
    }
    fields = normalizeFields(checks.fields);
    if (fields.website || fields.botcheck) throw new Failure('Invalid form submission.');
    const token = verify(kind, fields);
    const timing = validateSubmissionTiming(fields.form_loaded_at);
    if (!timing.ok) throw new Failure(timing.message);
    const context = contextFrom(fields);
    if (kind === 'contact' && !['hiring', 'looking'].includes(fields.side))
      throw new Failure('Choose hiring or looking.');
    for (const key of ['sector', 'service', 'intent'])
      if (fields[key] && fields[key] !== context[key]) throw new Failure(`Invalid ${key} context.`);
    const active =
      kind === 'sample'
        ? ['name', 'email', 'company']
        : context.side === 'looking'
          ? ['name', 'email', 'note']
          : ['name', 'email', 'role', 'company', 'message'];
    const data = Object.fromEntries(active.map((key) => [key, fields[key] || '']));
    for (const key of active) {
      if (
        typeof data[key] !== 'string' ||
        data[key].length > (['note', 'message'].includes(key) ? 4000 : key === 'email' ? 254 : 200)
      )
        throw new Failure(`Invalid ${key}.`);
    }
    const required =
      kind === 'sample'
        ? ['name', 'email', 'company']
        : context.side === 'looking'
          ? ['name', 'email']
          : ['name', 'email', 'role', 'company'];
    if (required.some((key) => !data[key]) || !isValidEmail(data.email))
      throw new Failure('Complete all required fields with a valid email.');
    const attachments = [];
    if (kind === 'contact' && context.side === 'looking') {
      if (checks.files.length !== 1 || checks.files[0].fieldName !== 'cv')
        throw new Failure('Attach exactly one CV using the CV field.');
      const validated = validateResumeFile(checks.files[0]);
      if (!validated.ok) throw new Failure(validated.message);
      const scan = await inspectUploadedFile(validated.file, 'contact-v9');
      if (!scan.ok) throw new Failure(scan.message, 503, 'scan', true);
      attachments.push({
        filename: scan.file.filename,
        content: scan.file.content.toString('base64'),
        content_type: scan.file.mimeType,
      });
      data.cv_sha256 = crypto.createHash('sha256').update(scan.file.content).digest('hex');
    } else if (checks.files.length) throw new Failure('This form does not accept files.');
    const text = Object.entries({ ...data, ...context })
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    const prefix = `v9/${kind}/${token.id}`;
    if (kind === 'sample') {
      const pdf = fs.readFileSync('netlify/functions/_assets/sample-write-up.pdf');
      await send(cfg, `${prefix}/sample`, {
        to: [data.email],
        subject: 'Your Tribera sample write-up',
        text: `Here is the sample you requested. This does not subscribe you.\n\n${text}`,
        attachments: [
          { filename: 'tribera-sample-write-up.pdf', content: pdf.toString('base64'), content_type: 'application/pdf' },
        ],
      });
      await send(cfg, `${prefix}/lead`, {
        to: [cfg.lead],
        reply_to: data.email,
        subject: 'Sample write-up requested',
        text,
      });
    } else
      await send(cfg, `${prefix}/contact`, {
        to: [context.side === 'looking' ? cfg.looking : cfg.hiring],
        reply_to: data.email,
        subject: `Contact request: ${context.side}`,
        text,
        attachments,
      });
    return respond(
      json(200, {
        success: true,
        message: kind === 'sample' ? 'The sample was sent and your request recorded.' : 'Your message was received.',
      })
    );
  } catch (error) {
    return respond(
      json(error.status || 503, {
        success: false,
        message: error instanceof Failure ? error.message : 'Delivery could not be confirmed. Retry the same request.',
        code: error.code || 'delivery',
        retryable: error instanceof Failure ? error.retryable : true,
      })
    );
  }
};
