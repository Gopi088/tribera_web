/**
 * Aggregate existing v9-gate JSON reports without running or inventing checks.
 * Usage: node scripts/v9-evidence.mjs --manifest required.json --output summary.json
 *
 * Manifest schema (report paths are relative to the manifest):
 * { scope: "Static/browser evidence only", revision: "<40 hex>", lockHash: "<64 hex>",
 *   builds: { production: "<64 hex>" }, reports: [
 *     { id: "production-static", path: "static-chromium.json", build: "production", gate: "static" },
 *     { id: "production-chromium", path: "browser-chromium.json", build: "production",
 *       gate: "browser", browser: "chromium" }
 *   ] }
 * List EVERY required report explicitly. This verifies only that declared set,
 * not the completeness of a migration gate. TAP, reference-comparison reports,
 * hand-authored summaries and hosted/release acceptance are not supported inputs.
 * Exit 1 on invalid configuration or any missing, failed or inconsistent report.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const sha = (value, length) => typeof value === 'string' && new RegExp(`^[a-f0-9]{${length}}$`).test(value);
const positive = (value) => Number.isSafeInteger(value) && value > 0;
const nonnegative = (value) => Number.isSafeInteger(value) && value >= 0;
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const browsers = ['chromium', 'webkit', 'firefox'];
const suiteNames = {
  static: ['checker-negative-tests', 'route-map-and-built-references'],
  browser: ['browser-smoke-and-rendered-references'],
};
const canonicalPath = (file) => (fs.existsSync(file) ? fs.realpathSync(file) : path.resolve(file));
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');

function validateReport(report, requirement, manifest) {
  const errors = [];
  const check = (condition, message) => {
    if (!condition) errors.push(message);
  };
  if (!object(report)) return ['Report must be an object'];
  check(report.gate === requirement.gate, 'Gate mismatch');
  check(report.status === 'passed', `Reported status is ${JSON.stringify(report.status)}`);
  check(report.commit === manifest.revision, 'Revision mismatch');
  check(report.lockHash === manifest.lockHash, 'Dependency lock hash mismatch');
  check(report.buildHash === manifest.builds[requirement.build], 'Build hash mismatch');
  check(report.cleanTree === true, 'Report was not captured from a clean working tree');
  check(!report.error, 'Report contains a top-level error');
  for (const field of ['command', 'node', 'platform', 'buildPath']) check(nonempty(report[field]), `Missing ${field}`);
  const started = Date.parse(report.startedAt),
    finished = Date.parse(report.finishedAt);
  check(Number.isFinite(started) && Number.isFinite(finished) && finished >= started, 'Invalid report timestamps');
  if (!Array.isArray(report.suites)) return [...errors, 'Missing suites'];
  const names = report.suites.map((suite) => suite?.name);
  const expected = suiteNames[requirement.gate];
  check(
    names.length === expected.length &&
      new Set(names).size === names.length &&
      expected.every((name) => names.includes(name)),
    'Required suite set mismatch'
  );
  for (const suite of report.suites) {
    if (!object(suite)) {
      errors.push('Malformed suite');
      continue;
    }
    const label = suite.name || 'unnamed suite';
    check(suite.status === 'passed', `${label}: suite did not pass`);
    if (suite.errors !== undefined)
      check(Array.isArray(suite.errors) && suite.errors.length === 0, `${label}: errors reported`);
    if (suite.skipped !== undefined) check(suite.skipped === 0, `${label}: skipped checks`);
    if (suite.exitCode !== undefined) check(suite.exitCode === 0, `${label}: nonzero exit code`);
    if (suite.name === 'checker-negative-tests') {
      check(suite.exitCode === 0 && suite.skipped === 0, `${label}: missing success/skip counts`);
      check(
        positive(suite.expectedMinimum) &&
          suite.expectedMinimum >= 5 &&
          positive(suite.executed) &&
          suite.executed >= suite.expectedMinimum,
        `${label}: insufficient execution`
      );
    } else if (suite.name === 'route-map-and-built-references') {
      check(
        positive(suite.expectedRoutes) &&
          positive(suite.baselineRoutes) &&
          nonnegative(suite.futureRoutes) &&
          suite.expectedRoutes === suite.baselineRoutes + suite.futureRoutes,
        `${label}: inconsistent route counts`
      );
      check(
        positive(suite.executedPages) && suite.executedPages >= suite.baselineRoutes && positive(suite.references),
        `${label}: missing page/reference coverage`
      );
      check(Array.isArray(suite.errors) && suite.errors.length === 0, `${label}: missing clean error list`);
    } else if (suite.name === 'browser-smoke-and-rendered-references') {
      check(suite.browser === requirement.browser, `${label}: browser mismatch`);
      const validRoutes =
        Array.isArray(suite.routes) &&
        suite.routes.length > 0 &&
        suite.routes.every((route) => typeof route === 'string' && route.startsWith('/')) &&
        new Set(suite.routes).size === suite.routes.length;
      const validWidths =
        Array.isArray(suite.viewports) &&
        suite.viewports.length > 0 &&
        suite.viewports.every(positive) &&
        new Set(suite.viewports).size === suite.viewports.length;
      check(validRoutes && validWidths, `${label}: invalid route/viewport coverage`);
      check(
        positive(suite.expectedChecks) &&
          suite.executedChecks === suite.expectedChecks &&
          validRoutes &&
          validWidths &&
          suite.expectedChecks === suite.routes.length * suite.viewports.length &&
          positive(suite.renderedReferences),
        `${label}: incomplete execution`
      );
      check(Array.isArray(suite.errors) && suite.errors.length === 0, `${label}: missing clean error list`);
    }
  }
  return errors;
}

export function summarizeEvidence(manifest, baseDirectory = '.') {
  const summary = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    status: 'failed',
    scope: manifest?.scope ?? null,
    revision: manifest?.revision ?? null,
    lockHash: manifest?.lockHash ?? null,
    builds: manifest?.builds ?? null,
    expectedReports: Array.isArray(manifest?.reports) ? manifest.reports.length : 0,
    verifiedReports: 0,
    reports: [],
    errors: [],
    limitations: [
      'Only the explicitly declared static/browser reports are verified; this is not full G1 or release acceptance.',
      'Hashes bind the files read here; the generator does not authenticate report authorship or independently rerun tests.',
    ],
  };
  const errors = summary.errors;
  if (!object(manifest)) errors.push('Manifest must be an object');
  if (!nonempty(manifest?.scope)) errors.push('Explicit evidence scope is required');
  if (!sha(manifest?.revision, 40)) errors.push('Expected full revision is required');
  if (!sha(manifest?.lockHash, 64)) errors.push('Expected lock hash is required');
  if (
    !object(manifest?.builds) ||
    !Object.keys(manifest.builds).length ||
    !Object.values(manifest.builds).every((hash) => sha(hash, 64))
  )
    errors.push('Named expected build hashes are required');
  if (!Array.isArray(manifest?.reports) || !manifest.reports.length)
    errors.push('Required report list cannot be empty');
  if (errors.length) return summary;
  const ids = new Set(),
    paths = new Set(),
    roles = new Set();
  for (const entry of manifest.reports) {
    if (
      !object(entry) ||
      !nonempty(entry.id) ||
      !nonempty(entry.path) ||
      !Object.hasOwn(manifest.builds, entry.build) ||
      !Object.hasOwn(suiteNames, entry.gate) ||
      (entry.gate === 'browser' && !browsers.includes(entry.browser))
    ) {
      errors.push('Malformed required report entry');
      continue;
    }
    const source = canonicalPath(path.resolve(baseDirectory, entry.path));
    const role = [entry.build, entry.gate, entry.browser || ''].join(':');
    if (ids.has(entry.id) || paths.has(source) || roles.has(role)) {
      errors.push(`Duplicate report identity or path: ${entry.id}`);
      continue;
    }
    ids.add(entry.id);
    paths.add(source);
    roles.add(role);
    const item = {
      id: entry.id,
      path: source,
      gate: entry.gate,
      build: entry.build,
      browser: entry.browser ?? null,
      sha256: null,
      reportedStatus: null,
      verifiedStatus: 'failed',
      commit: null,
      buildHash: null,
      errors: [],
    };
    try {
      const bytes = fs.readFileSync(source);
      item.sha256 = digest(bytes);
      const report = JSON.parse(bytes);
      item.reportedStatus = report?.status ?? null;
      item.commit = report?.commit ?? null;
      item.buildHash = report?.buildHash ?? null;
      for (const field of ['lockHash', 'cleanTree', 'startedAt', 'finishedAt', 'command', 'node', 'platform'])
        item[field] = report?.[field] ?? null;
      item.suites = report?.suites ?? null;
      item.limitations = report?.limitations ?? [];
      item.errors = validateReport(report, entry, manifest);
      if (!item.errors.length) {
        item.verifiedStatus = 'passed';
        summary.verifiedReports++;
      }
    } catch (error) {
      item.errors.push(error.message);
    }
    summary.reports.push(item);
  }
  for (const build of Object.keys(manifest.builds))
    if (!manifest.reports.some((entry) => entry?.build === build))
      errors.push(`No required reports for declared build: ${build}`);
  if (summary.verifiedReports !== summary.expectedReports) errors.push('Not all required reports verified');
  if (!errors.length) summary.status = 'passed';
  return summary;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.length !== 4 || args[0] !== '--manifest' || args[2] !== '--output') {
    console.error('Usage: node scripts/v9-evidence.mjs --manifest required.json --output summary.json');
    process.exitCode = 1;
  } else {
    let summary;
    try {
      const input = fs.readFileSync(args[1]);
      summary = summarizeEvidence(JSON.parse(input), path.dirname(path.resolve(args[1])));
      summary.requirements = { path: path.resolve(args[1]), sha256: digest(input) };
    } catch (error) {
      summary = { schemaVersion: 1, status: 'failed', errors: [error.message] };
    }
    const output = canonicalPath(path.resolve(args[3]));
    // Never overwrite the requirements or a raw report with its derived summary.
    if (output === canonicalPath(path.resolve(args[1])) || summary.reports?.some((report) => report.path === output)) {
      console.error('Summary output must differ from all input files');
      process.exitCode = 1;
    } else {
      fs.mkdirSync(path.dirname(output), { recursive: true });
      fs.writeFileSync(output, JSON.stringify(summary, null, 2) + '\n');
      console.log(
        JSON.stringify({
          status: summary.status,
          output,
          expectedReports: summary.expectedReports,
          verifiedReports: summary.verifiedReports,
          errors: summary.errors,
        })
      );
      if (summary.status !== 'passed') process.exitCode = 1;
    }
  }
}
