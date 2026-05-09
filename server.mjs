#!/usr/bin/env node

import { createServer } from 'node:http';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(new URL('.', import.meta.url).pathname);
const port = Number(process.env.PORT || process.argv[2] || 8000);
const workspacePath = join(root, 'tasks.json');
const backupPath = join(root, '.taskflow-backup.json');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = createServer(async (req, res) => {
  try {
    if (req.url === '/api/workspace' && req.method === 'GET') {
      return sendJson(res, JSON.parse(await readFile(workspacePath, 'utf8')));
    }

    if (req.url === '/api/workspace' && req.method === 'POST') {
      const body = await readBody(req);
      const next = JSON.parse(body);
      const current = await readFile(workspacePath, 'utf8').catch(() => '');
      if (current && current !== JSON.stringify(next, null, 2) + '\n') {
        await writeFile(backupPath, current);
      }
      await writeFile(workspacePath, JSON.stringify(next, null, 2) + '\n');
      return sendJson(res, { ok: true });
    }

    if (req.url === '/api/workspace/restore-backup' && req.method === 'POST') {
      const backup = await readFile(backupPath, 'utf8');
      const current = await readFile(workspacePath, 'utf8').catch(() => '');
      if (current) await writeFile(backupPath, current);
      await writeFile(workspacePath, backup);
      return sendJson(res, JSON.parse(backup));
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return sendText(res, 405, 'Method not allowed');
    }

    return serveStatic(req, res);
  } catch (error) {
    return sendText(res, 500, error.message);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`AI Task Flow shared server: http://localhost:${port}/`);
  console.log(`LAN access: http://<this-computer-ip>:${port}/`);
});

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) {
        req.destroy(new Error('Request body is too large'));
      }
    });
    req.on('end', () => resolveBody(body));
    req.on('error', reject);
  });
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const requestedPath = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).replace(/^\/+/, '');
  const filePath = resolve(root, normalize(requestedPath).replace(/^(\.\.[/\\])+/, ''));
  if (!filePath.startsWith(root)) return sendText(res, 403, 'Forbidden');

  const fileStat = await stat(filePath).catch(() => null);
  if (!fileStat?.isFile()) return sendText(res, 404, 'Not found');

  res.writeHead(200, {
    'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
    'Content-Length': fileStat.size
  });
  if (req.method === 'HEAD') return res.end();
  createReadStream(filePath).pipe(res);
}

function sendJson(res, value) {
  const body = JSON.stringify(value, null, 2);
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function sendText(res, status, text) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(text);
}
