import { getResendConfig, json, parseMultipartForm, sendResendEmail } from './_lib/form-utils.mjs';

const configs = {
  contact: {
    recipient: process.env.CONTACT_TO || 'contact@tribera.ai',
    subject: (fields) => `Contact form: ${fields.first_name} ${fields.last_name}`.trim(),
    failureMessage: 'Something went wrong while sending your message. Please try again or email contact@tribera.ai.',
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
          <p><strong>First name:</strong> ${fields.first_name}</p>
          <p><strong>Last name:</strong> ${fields.last_name}</p>
          <p><strong>Email:</strong> ${fields.email}</p>
          <p><strong>Company:</strong> ${fields.company || 'Not provided'}</p>
          <p><strong>Interest:</strong> ${fields.interest}</p>
          <p><strong>Message:</strong></p>
          <p>${fields.message.replace(/\n/g, '<br />')}</p>
        </div>
      `,
    }),
  },
  demo: {
    recipient: process.env.SALES_TO || 'sales@tribera.ai',
    subject: (fields) => `Demo request: ${fields.name}`,
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
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #111;">
          <h2 style="margin-bottom: 16px;">New demo request</h2>
          <p><strong>Name:</strong> ${fields.name}</p>
          <p><strong>Email:</strong> ${fields.email}</p>
          <p><strong>Phone:</strong> ${fields.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${fields.company || 'Not provided'}</p>
        </div>
      `,
    }),
  },
  sales: {
    recipient: process.env.SALES_TO || 'sales@tribera.ai',
    subject: (fields) => `Sales inquiry: ${fields.name}`,
    failureMessage:
      'Something went wrong while submitting your request. Please try again or email sales@tribera.ai.',
    validate: (fields) => fields.name && fields.email,
    build: (fields) => ({
      text: [
        'New contact sales submission',
        '',
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Company: ${fields.company || 'Not provided'}`,
        '',
        'Message:',
        fields.message || 'Not provided',
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #111;">
          <h2 style="margin-bottom: 16px;">New contact sales submission</h2>
          <p><strong>Name:</strong> ${fields.name}</p>
          <p><strong>Email:</strong> ${fields.email}</p>
          <p><strong>Company:</strong> ${fields.company || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${(fields.message || 'Not provided').replace(/\n/g, '<br />')}</p>
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
    const { fields } = await parseMultipartForm(event, { maxFiles: 0 });
    const formType = fields.form_type;
    const config = configs[formType];

    if (!config) {
      return json(400, { success: false, message: 'Invalid form submission.' });
    }

    failureMessage = config.failureMessage;

    if (fields.botcheck) {
      return json(200, { success: true });
    }

    if (!config.validate(fields)) {
      return json(400, { success: false, message: 'Please complete the required fields.' });
    }

    const { resendApiKey, from } = getResendConfig();
    const { text, html } = config.build(fields);

    await sendResendEmail({
      to: config.recipient,
      from,
      resendApiKey,
      replyTo: fields.email,
      subject: config.subject(fields),
      text,
      html,
    });

    return json(200, { success: true });
  } catch (error) {
    console.error('Site inquiry function failed:', error);

    return json(500, {
      success: false,
      message: failureMessage,
    });
  }
};
