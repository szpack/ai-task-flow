#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const versionPath = resolve(root, 'VERSION');
const packagePath = resolve(root, 'package.json');
const appPath = resolve(root, 'app.js');
const changelogPath = resolve(root, 'CHANGELOG.md');

const bumpArg = process.argv[2];
const notes = readNotes(process.argv.slice(3));

if (!bumpArg || bumpArg === '--help' || bumpArg === '-h') {
  printUsage();
  process.exit(bumpArg ? 0 : 1);
}

const currentVersion = readFileSync(versionPath, 'utf8').trim();
const nextVersion = nextSemver(currentVersion, bumpArg);
const today = new Date().toISOString().slice(0, 10);

writeFileSync(versionPath, `${nextVersion}\n`);
updatePackageJson(nextVersion);
updateAppJs(nextVersion);
updateChangelog(nextVersion, today, notes);

console.log(`Version bumped: ${currentVersion} -> ${nextVersion}`);

function nextSemver(current, bump) {
  if (/^\d+\.\d+\.\d+$/.test(bump)) return bump;

  const match = current.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    throw new Error(`VERSION must be SemVer x.y.z, got: ${current}`);
  }

  let major = Number(match[1]);
  let minor = Number(match[2]);
  let patch = Number(match[3]);

  if (bump === 'major') {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (bump === 'minor') {
    minor += 1;
    patch = 0;
  } else if (bump === 'patch') {
    patch += 1;
  } else {
    throw new Error(`Unknown bump "${bump}". Use major, minor, patch, or x.y.z.`);
  }

  return `${major}.${minor}.${patch}`;
}

function readNotes(args) {
  const notesIndex = args.indexOf('--notes');
  if (notesIndex === -1) return [];

  const value = args[notesIndex + 1];
  if (!value) {
    throw new Error('--notes requires a value.');
  }

  return value
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.replace(/^-+\s*/, ''));
}

function updatePackageJson(version) {
  if (!existsSync(packagePath)) return;
  const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
  pkg.version = version;
  writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
}

function updateAppJs(version) {
  const js = readFileSync(appPath, 'utf8');
  const next = js.replace(
    /const APP_VERSION = '[^']+';/,
    `const APP_VERSION = '${version}';`
  );

  if (next === js) {
    throw new Error('Could not find APP_VERSION in app.js.');
  }

  writeFileSync(appPath, next);
}

function updateChangelog(version, date, releaseNotes) {
  const changelog = readFileSync(changelogPath, 'utf8');
  const heading = `## [${version}] - ${date}`;
  if (changelog.includes(heading)) {
    throw new Error(`CHANGELOG.md already has an entry for ${version}.`);
  }

  const notesBlock = releaseNotes.length
    ? ['### Changed', ...releaseNotes.map(note => `- ${note}`)].join('\n')
    : '### Changed\n- Version bump.';

  const next = changelog.replace(
    /## \[Unreleased\]\n/,
    `## [Unreleased]\n\n${heading}\n\n${notesBlock}\n\n`
  );

  if (next === changelog) {
    throw new Error('Could not find ## [Unreleased] in CHANGELOG.md.');
  }

  writeFileSync(changelogPath, next);
}

function printUsage() {
  console.log(`Usage:
  npm run version:patch
  npm run version:minor
  npm run version:major
  npm run version:set -- 1.2.3
  npm run version:patch -- --notes "Fixed import form reset"

Updates VERSION, package.json, app.js, and CHANGELOG.md.`);
}
