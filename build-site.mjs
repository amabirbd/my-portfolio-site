import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const outputFile = join(projectRoot, 'dist', 'server', 'index.js');

const sourceFiles = [
  'index.html', 'style.css', 'index.js', 'project.css', 'portfolio-data.js', 'project.js',
  'robots.txt', 'sitemap.xml',
  'projects/wander-woman/index.html', 'projects/sneaker-drop/index.html',
  'projects/rag-saas/index.html', 'projects/iqbarter/index.html', 'projects/unishopr/index.html',
  'assets/wander-woman.webp', 'assets/sneaker-drop.webp', 'assets/rag-saas.webp',
  'assets/iqbarter.webp', 'assets/unishopr.webp', 'assets/al-muntasir-abir.webp',
  'assets/portfolio-social-card-v2.png', 'assets/al-muntasir-abir-resume.pdf'
];

const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png',
  '.pdf': 'application/pdf'
};

const entries = {};
for (const relativePath of sourceFiles) {
  const body = await readFile(join(projectRoot, relativePath));
  const extension = relativePath.slice(relativePath.lastIndexOf('.'));
  entries[`/${relativePath.replaceAll('\\', '/')}`] = {
    body: body.toString('base64'),
    type: mimeTypes[extension] ?? 'application/octet-stream'
  };
}

const workerSource = `const ENTRIES = ${JSON.stringify(entries)};
const decoded = new Map();
const redirects = new Set(['/projects/wander-woman','/projects/sneaker-drop','/projects/rag-saas','/projects/iqbarter','/projects/unishopr']);

function decode(entry) {
  if (!decoded.has(entry.body)) decoded.set(entry.body, Uint8Array.from(atob(entry.body), value => value.charCodeAt(0)));
  return decoded.get(entry.body);
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let pathname = decodeURIComponent(url.pathname);
    if (redirects.has(pathname)) return Response.redirect(url.origin + pathname + '/', 308);
    if (pathname === '/') pathname = '/index.html';
    else if (pathname.endsWith('/')) pathname += 'index.html';
    const entry = ENTRIES[pathname];
    if (!entry) return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });

    const isText = entry.type.startsWith('text/') || entry.type.includes('javascript') || entry.type.includes('xml');
    let body = decode(entry);
    if (isText) body = new TextDecoder().decode(body).replaceAll('{{ORIGIN}}', url.origin);
    const headers = new Headers({
      'content-type': entry.type,
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'permissions-policy': 'camera=(), microphone=(), geolocation=()'
    });
    headers.set('cache-control', pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate');
    if (pathname.endsWith('.pdf')) headers.set('content-disposition', 'inline; filename="al-muntasir-abir-resume.pdf"');
    return new Response(request.method === 'HEAD' ? null : body, { status: 200, headers });
  }
};
`;

await rm(join(projectRoot, 'dist'), { recursive: true, force: true });
await mkdir(dirname(outputFile), { recursive: true });
await writeFile(outputFile, workerSource);
console.log(`Built ${sourceFiles.length} static files into dist/server/index.js`);
