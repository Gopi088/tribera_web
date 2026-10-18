// A request-time native form keeps the existing timing guard usable without JS.
// Never cache this response: a build-time or cached timestamp expires.
export const handler = async (event) => {
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow',
    'Content-Security-Policy': "default-src 'none'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    'X-Content-Type-Options': 'nosniff',
  };
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: { ...headers, Allow: 'GET' }, body: 'Method not allowed.' };
  }
  return {
    statusCode: 200,
    headers,
    body: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex, nofollow"><title>Send your CV · Tribera</title></head><body><main>
<h1>Send your CV</h1><p>Private migration preview. Submitting this form sends your CV to the candidate team.</p>
<p>Include your contact details in your CV so the team can reach you. JavaScript is not required.</p>
<form action="/.netlify/functions/candidate-profile-v9" method="post" enctype="multipart/form-data">
<input type="hidden" name="form_loaded_at" value="${Date.now()}">
<div hidden><label>Leave this blank <input name="botcheck" tabindex="-1" autocomplete="off"></label></div>
<p><label>Your CV (required) <input type="file" name="cv" accept=".pdf,.doc,.docx" required aria-describedby="cv-help"></label></p>
<p id="cv-help">PDF, DOC or DOCX, up to 10 MB. If the upload cannot be completed, email careers@tribera.ai.</p>
<fieldset><legend>What are you looking for?</legend><p><label><input type="radio" name="intent" value="active" required checked> Actively looking</label></p><p><label><input type="radio" name="intent" value="open" required> Open to the right role</label></p></fieldset>
<p><label>Phone number (optional) <input type="tel" name="phone" maxlength="32" autocomplete="tel"></label></p>
<p><button type="submit">Send my CV</button></p></form>
<p>This form expires after two hours. <a href="/.netlify/functions/candidate-form-v9">Open a fresh form</a> if needed.</p>
<p><a href="/privacy">Privacy policy</a> · <a href="mailto:careers@tribera.ai">Email the candidate team</a></p>
</main></body></html>`,
  };
};
