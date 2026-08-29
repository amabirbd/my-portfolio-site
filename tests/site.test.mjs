import assert from 'node:assert/strict';
import test from 'node:test';

const workerUrl = new URL('../dist/server/index.js', import.meta.url);
workerUrl.searchParams.set('test', `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const fetchPath = (path, method = 'GET') => worker.fetch(new Request(`https://portfolio.example${path}`, { method }));

test('serves the complete homepage with production metadata', async () => {
  const response = await fetchPath('/');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^text\/html/);
  const html = await response.text();
  assert.match(html, /Backend Software Engineer/);
  assert.match(html, /Wander Woman/);
  assert.match(html, /https:\/\/portfolio\.example\/assets\/portfolio-social-card-v2\.png/);
  assert.doesNotMatch(html, /\{\{ORIGIN\}\}/);
});

test('serves every case-study route', async () => {
  for (const slug of ['wander-woman','sneaker-drop','rag-saas','iqbarter','unishopr']) {
    const response = await fetchPath(`/projects/${slug}/`);
    assert.equal(response.status, 200, slug);
    assert.match(response.headers.get('content-type'), /^text\/html/, slug);
  }
});

test('redirects case-study routes to their canonical trailing slash', async () => {
  const response = await fetchPath('/projects/wander-woman');
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://portfolio.example/projects/wander-woman/');
});

test('serves optimized assets with explicit content types', async () => {
  const image = await fetchPath('/assets/wander-woman.webp');
  assert.equal(image.status, 200);
  assert.equal(image.headers.get('content-type'), 'image/webp');
  const resume = await fetchPath('/assets/al-muntasir-abir-resume.pdf', 'HEAD');
  assert.equal(resume.status, 200);
  assert.equal(resume.headers.get('content-type'), 'application/pdf');
});

test('returns a clean 404 for unknown files', async () => {
  const response = await fetchPath('/missing');
  assert.equal(response.status, 404);
});
