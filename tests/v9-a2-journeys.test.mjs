import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';
import { startA2Server } from './v9-a2-test-server.mjs';
import { withEnv } from './netlify-function-test-utils.mjs';
import { resetRateLimitStore } from '../netlify/functions/_lib/request-guards.mjs';
import { waitForPageCondition } from '../scripts/v9-browser-readiness.mjs';

const engine = process.env.BROWSER || 'chromium';
const harness = await startA2Server();
const { base, provider } = harness;
const browser = await { chromium, firefox, webkit }[engine].launch();
const records = [];
const cv = { name: 'resume.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n%%EOF') };
const emails = (to) =>
  provider.deliveries.filter((delivery) =>
    (Array.isArray(delivery.body.to) ? delivery.body.to : [delivery.body.to]).includes(to)
  );
const settle = async (page, selector, pattern) => {
  await waitForPageCondition(
    page,
    ({ selector, source }) => {
      const node = document.querySelector(selector);
      return !!node && new RegExp(source, 'i').test(node.textContent || '');
    },
    { selector, source: pattern.source },
    { timeout: 15000 }
  );
};
async function fillIdentity(form, email = 'reader@example.com') {
  await form.locator('input[name="name"]:enabled').fill('A2 Test Reader');
  await form.locator('input[name="email"]:enabled').fill(email);
}
async function fillHiring(form) {
  await fillIdentity(form);
  await form.locator('input[name="company"]:enabled').fill('Example Company');
  await form.locator('input[name="role"]:enabled').fill('Staff Engineer');
  await form.locator('textarea[name="message"]:enabled').fill('A role open for six weeks. Please keep the context.');
}
async function fillSample(form) {
  await fillIdentity(form);
  await form.locator('input[name="company"]').fill('Example Company');
}
try {
  await withEnv(
    {
      ALLOWED_FORM_ORIGINS: base,
      FORM_MIN_SUBMIT_MS: '25',
      FORM_MAX_SUBMIT_AGE_MS: '7200000',
      FORM_RATE_LIMIT_MAX: '500',
      FORM_RATE_LIMIT_SHARED_URL: '',
      FORM_UPLOAD_SCAN_MODE: 'off',
      RESEND_API_KEY: 'mock-api-key',
      RESEND_FROM: 'Forms <forms@example.com>',
      CONTACT_HIRING_TO: 'hiring@example.com',
      CONTACT_LOOKING_TO: 'looking@example.com',
      SAMPLE_LEADS_TO: 'leads@example.com',
      FORM_REQUEST_TOKEN_SECRET: 'local-a2-test-secret-not-for-production-123456789',
    },
    async () => {
      resetRateLimitStore();
      const page = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(`${base}/__v9/contact?service=iaas&sector=banking-financial-services`);
      const form = page.locator('#ctForm');
      assert.equal(await form.locator('[data-for="looking"]').getAttribute('disabled'), '');
      assert.equal(await form.locator('input[name="service"]').inputValue(), 'iaas');
      assert.equal(await form.locator('input[name="sector"]').inputValue(), 'banking-financial-services');
      await fillHiring(form);
      await form.locator('button[type="submit"]').click();
      await settle(page, '[data-contact-status]', /received/);
      assert.equal(emails('hiring@example.com').length, 1);
      assert.match(emails('hiring@example.com')[0].body.text, /iaas|Interview as a service/i);
      assert.match(emails('hiring@example.com')[0].body.text, /banking-financial-services|Banking & financial/i);
      records.push('enhanced hiring delivery preserves service and sector');

      await page.goto(`${base}/__v9/contact?side=looking&service=constructor&sector=unknown`);
      assert.equal(await form.getAttribute('data-side'), 'looking');
      assert.equal(await form.locator('input[name="service"]').inputValue(), '');
      assert.equal(await form.locator('input[name="sector"]').inputValue(), '');
      assert.equal(await form.locator('[data-for="hiring"]').getAttribute('disabled'), '');
      await fillIdentity(form);
      await form.locator('textarea[name="note"]').fill('Please keep this search confidential.');
      await form.locator('input[name="cv"]').setInputFiles({ ...cv, buffer: Buffer.from('wrong signature') });
      await form.locator('button[type="submit"]').click();
      await settle(page, '[data-contact-status]', /valid|file|PDF|document|format/i);
      assert.equal(emails('looking@example.com').length, 0);
      await form.locator('input[name="cv"]').setInputFiles(cv);
      await form.locator('button[type="submit"]').click();
      await settle(page, '[data-contact-status]', /received/);
      assert.equal(emails('looking@example.com').length, 1);
      assert.equal(emails('looking@example.com')[0].body.attachments.length, 1);
      assert.match(emails('looking@example.com')[0].body.text, /confidential/);
      assert.doesNotMatch(emails('looking@example.com')[0].body.text, /Staff Engineer/);
      records.push('enhanced looking excludes inactive fields and rejects invalid CV signature');

      for (const failure of [null, { to: 'leads@example.com' }, { to: 'reader@example.com', accepted: true }]) {
        const before = provider.deliveries.length;
        await page.goto(`${base}/__v9/sample-write-up`);
        const sample = page.locator('#swForm');
        await fillSample(sample);
        provider.failNext = failure;
        await sample.locator('button[type="submit"]').click();
        if (failure) {
          await settle(page, '#swErr:not([hidden])', /retry|try again|could not|unable|not confirm|not complete/);
          assert.equal(
            provider.deliveries.length - before,
            1,
            'First sample step accepted before partial/lost-response failure'
          );
          await sample.locator('button[type="submit"]').click();
        }
        await settle(page, '#swDone:not([hidden])', /sent|on its way|check your|emailed/);
        assert.equal(
          provider.deliveries.length - before,
          2,
          'Exactly one sample and one lead notification per request'
        );
        const delivery = provider.deliveries.slice(before).find((row) => row.body.attachments?.length);
        assert.ok(delivery, 'Real private attachment included');
        assert.deepEqual(
          Buffer.from(delivery.body.attachments[0].content, 'base64'),
          fs.readFileSync('sample_data/tribera-web-handoff-v9/docs/email-assets/tribera-sample-candidate-write-up.pdf')
        );
        records.push(
          failure?.accepted
            ? 'sample lost-response retry deduplicated'
            : failure
              ? 'sample partial lead failure retry deduplicated'
              : 'sample and lead delivered without subscription'
        );
      }
      assert.deepEqual(errors, []);
      await page.close();

      const native = await browser.newPage({ javaScriptEnabled: false });
      await native.goto(`${base}/__v9/contact?side=hiring&service=iaas&sector=banking-financial-services`);
      await native.locator('a[href*="/.netlify/functions/contact-form-v9"]').first().click();
      const nativeForm = native.locator('form[action*="contact-send-v9"]');
      assert.equal(
        await nativeForm.locator('[name="service"]').inputValue(),
        'iaas',
        'Same-origin native navigation retains source context'
      );
      await fillHiring(nativeForm);
      const beforeNative = provider.deliveries.length;
      await nativeForm.locator('button[type="submit"]').click();
      await native.waitForURL('**/contact-form-v9?received=*');
      await native.reload();
      assert.equal(provider.deliveries.length, beforeNative + 1, 'PRG refresh does not send again');
      records.push('native hiring context and PRG');
      await native.goto(`${base}/__v9/sample-write-up`);
      await native.locator('a[href*="/.netlify/functions/sample-form-v9"]').first().click();
      const nativeSample = native.locator('form[action*="sample-request-v9"]');
      await fillSample(nativeSample);
      const beforeSample = provider.deliveries.length;
      await nativeSample.locator('button[type="submit"]').click();
      await native.waitForURL('**/sample-form-v9?received=*');
      await native.reload();
      assert.equal(provider.deliveries.length, beforeSample + 2);
      records.push('native sample email/lead and PRG');
      await native.close();
    }
  );
  fs.mkdirSync('artifacts/v9-a2', { recursive: true });
  fs.writeFileSync(
    `artifacts/v9-a2/journeys-${engine}.json`,
    JSON.stringify(
      {
        status: 'passed',
        engine,
        records,
        providerAttempts: provider.attempts.length,
        uniqueDeliveries: provider.deliveries.length,
        scope: 'Compiled static pages and actual local handlers; mocked provider transport, not hosted delivery.',
      },
      null,
      2
    ) + '\n'
  );
  console.log(`${engine}: ${records.length} actual-handler enhanced/native A2 journeys passed with mocked provider`);
} finally {
  await browser.close();
  await harness.close();
}
