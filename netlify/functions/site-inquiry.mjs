import {
  badRequest,
  deliverFormEmail,
  escapeHtml,
  isValidEmail,
  json,
  logFunctionError,
  normalizeTextField,
  runFormRequestChecks,
  sanitizeSubjectPart,
} from './_lib/form-utils.mjs';

const CONTACT_INTERESTS = new Set(['Hiring Talent', 'Getting Hired', 'Partnerships', 'General Inquiry']);

const withBreaks = (value) => escapeHtml(value).replace(/\n/g, '<br />');

const configs = {
  contact: {
    recipient: process.env.CONTACT_TO || 'hello@tribera.ai',
    subject: (fields) =>
      `Contact form: ${sanitizeSubjectPart(fields.first_name)} ${sanitizeSubjectPart(fields.last_name)}`.trim(),
    failureMessage: 'Something went wrong while sending your message. Please try again or email hello@tribera.ai.',
    validate: (fields) => fields.first_name && fields.last_name && fields.email && fields.interest && fields.message,
    build: (fields) => ({
      text: [
        'New contact form submission',
        '',
        `First name: ${fields.first_name}`,
        `Last name: ${fields.last_name}`,
        `Email: ${fields.email}`,
        `Company: ${fields.company || 'Not provided'}`,
        `Interest: ${fields.interest}`,
        '',
        'Message:',
        fields.message,
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #111;">
          <h2 style="margin-bottom: 16px;">New contact form submission</h2>
          <p><strong>First name:</strong> ${escapeHtml(fields.first_name)}</p>
          <p><strong>Last name:</strong> ${escapeHtml(fields.last_name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(fields.company || 'Not provided')}</p>
          <p><strong>Interest:</strong> ${escapeHtml(fields.interest)}</p>
          <p><strong>Message:</strong></p>
          <p>${withBreaks(fields.message)}</p>
        </div>
      `,
    }),
  },
  demo: {
    recipient: process.env.SALES_TO || 'sales@tribera.ai',
    subject: (fields) => `Demo request: ${sanitizeSubjectPart(fields.name)}`,
    failureMessage:
      'Something went wrong while submitting your request. Please try again or email sales@tribera.ai.',
    validate: (fields) => fields.name && fields.email,
    build: (fields) => ({
      text: [
        'New demo request',
        '',
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Phone: ${fields.phone || 'Not provided'}`,
        `Company: ${fields.company || 'Not provided'}`,
        '',
        'Message:',
        fields.message || 'Not provided',
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #111;">
          <h2 style="margin-bottom: 16px;">New demo request</h2>
          <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(fields.phone || 'Not provided')}</p>
          <p><strong>Company:</strong> ${escapeHtml(fields.company || 'Not provided')}</p>
          <p><strong>Message:</strong></p>
          <p>${withBreaks(fields.message || 'Not provided')}</p>
        </div>
      `,
    }),
  },
  sales: {
    recipient: process.env.SALES_TO || 'sales@tribera.ai',
    subject: (fields) => `Sales inquiry: ${sanitizeSubjectPart(fields.name)}`,
    failureMessage:
      'Something went wrong while submitting your request. Please try again or email sales@tribera.ai.',
    validate: (fields) => fields.name && fields.email,
    build: (fields) => ({
      text: [
        'New contact sales submission',
        '',
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Phone: ${fields.phone || 'Not provided'}`,
        `Company: ${fields.company || 'Not provided'}`,
        '',
        'Message:',
        fields.message || 'Not provided',
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #111;">
          <h2 style="margin-bottom: 16px;">New contact sales submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(fields.phone || 'Not provided')}</p>
          <p><strong>Company:</strong> ${escapeHtml(fields.company || 'Not provided')}</p>
          <p><strong>Message:</strong></p>
          <p>${withBreaks(fields.message || 'Not provided')}</p>
        </div>
      `,
    }),
  },
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { success: false, message: 'Method not allowed.' });
  }

  let failureMessage = 'Something went wrong while submitting your request. Please try again in a moment.';

  try {
    const requestChecks = await runFormRequestChecks(event, {
      scope: 'site-inquiry',
      maxFiles: 0,
    });
    if (requestChecks.response) {
      return requestChecks.response;
    }

    const { fields } = requestChecks;
    const formType = fields.form_type;
    const config = configs[formType];

    if (!config) {
      return json(400, { success: false, message: 'Invalid form submission.' });
    }

    failureMessage = config.failureMessage;

    if (!config.validate(fields)) {
      return json(400, { success: false, message: 'Please complete the required fields.' });
    }

    if (!isValidEmail(fields.email)) {
      return badRequest('Please enter a valid email address.');
    }

    if (formType === 'contact' && !CONTACT_INTERESTS.has(normalizeTextField(fields.interest))) {
      return badRequest('Please select a valid inquiry type.');
    }

    const { text, html } = config.build(fields);

    await deliverFormEmail({
      to: config.recipient,
      replyTo: fields.email,
      subject: config.subject(fields),
      text,
      html,
    });

    return json(200, { success: true });
  } catch (error) {
    logFunctionError(event, 'site-inquiry', 'site_inquiry_failed');

    return json(500, {
      success: false,
      message: failureMessage,
    });
  }
};
