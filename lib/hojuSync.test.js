// node --test lib/hojuSync.test.js — checks the pure parts of the 호주주민 sync (no network).
import test from 'node:test';
import assert from 'node:assert/strict';
import { simplifyBody, inlineSpans, checkTranslation, toPortableText } from './hojuSync.js';
import { categoryFor } from './categories.js';

const post = {
  _id: 'post-e-13', asOfDate: '2026-10-01', region: 'national', roadmapId: 'E-13',
  keyTakeaways: ['실업률 4.7%'], faq: [{ question: '질문?', answer: '답.' }],
  sources: [{ title: 'ABS 자료', url: 'https://www.abs.gov.au/x' }],
  body: [
    { _type: 'block', style: 'h2', markDefs: [], children: [{ _type: 'span', text: '숫자로 보면?', marks: [] }] },
    { _type: 'table', rows: [{ cells: ['항목', '9월'] }, { cells: ['실업률', '4.7%'] }] },
    { _type: 'block', style: 'normal', listItem: 'bullet', markDefs: [{ _key: 'm1', _type: 'roadmapLink', roadmapId: 'E-1' }],
      children: [{ _type: 'span', text: '금리 해설', marks: ['m1'] }] },
    { _type: 'block', style: 'normal', markDefs: [{ _key: 'm2', _type: 'link', href: 'https://api.leadconnectorhq.com/widget/form/x' }],
      children: [{ _type: 'span', text: '문의하기', marks: ['m2'] }] },
  ],
};
const en = {
  title: 'Unemployment rose to 4.7%', summary: 'As at October 2026.', keyTakeaways: ['Unemployment was **4.7%**.'],
  blocks: [
    { kind: 'h2', text: 'The numbers', rows: [] },
    { kind: 'table', text: '', rows: [['Item', 'September'], ['Unemployment', '4.7%']] },
    { kind: 'bullet', text: 'See the [ABS release](https://www.abs.gov.au/x).', rows: [] },
  ],
  faq: [{ question: 'Q?', answer: 'A.' }], sourceTitles: ['ABS data'],
};

test('simplifyBody drops internal links and the lead-form link, keeps tables and lists', () => {
  const b = simplifyBody(post.body);
  assert.deepEqual(b.map(x => x.kind), ['h2', 'table', 'bullet', 'p']);
  assert.equal(b[2].text, '금리 해설');
  assert.equal(b[3].text, '문의하기');
});

test('inlineSpans parses bold and links', () => {
  const { children, markDefs } = inlineSpans('A **b** [c](https://x.y) d', 'k');
  assert.deepEqual(children.map(c => [c.text, c.marks]), [['A ', []], ['b', ['strong']], [' ', []], ['c', ['km0']], [' d', []]]);
  assert.equal(markDefs[0].href, 'https://x.y');
});

test('checkTranslation passes a faithful English version', () => {
  assert.deepEqual(checkTranslation(en, post), []);
});

test('checkTranslation catches Hangul, lead form, invented links and dropped FAQ', () => {
  const bad = { ...en, title: '실업률', faq: [], blocks: [...en.blocks, { kind: 'p', text: '[x](https://api.leadconnectorhq.com/y)', rows: [] }] };
  const errors = checkTranslation(bad, post).join(' | ');
  for (const want of ['Korean text', '호주주민-specific', 'FAQ count', 'link not in the Korean source']) assert.match(errors, new RegExp(want));
});

test('toPortableText adds as-at line, sections, CTA and disclaimer', () => {
  const pt = toPortableText(en, post);
  const texts = pt.filter(b => b._type === 'block').map(b => b.children.map(c => c.text).join(''));
  assert.equal(texts[0], 'Information as at October 2026 · applies Australia-wide');
  for (const h of ['Key takeaways', 'Frequently asked questions', 'Sources']) assert.ok(texts.includes(h));
  assert.match(texts.at(-2), /Get in touch with our team/);
  assert.match(texts.at(-1), /^General information only/);
  assert.equal(pt.find(b => b._type === 'table').rows[0].cells[1], 'September');
  assert.equal(new Set(pt.map(b => b._key)).size, pt.length);
});

test('categoryFor follows the blog roadmap prefix, then legacy slug', () => {
  assert.equal(categoryFor({ roadmapId: 'E-13' }).title, 'Market & News');
  assert.equal(categoryFor({ roadmapId: 'h-7' }).title, 'Home Loans');
  assert.equal(categoryFor({ roadmapId: '0-1' }).title, 'Home Loans');
  assert.equal(categoryFor({ roadmapId: 'N-6' }).title, 'Building a New Home');
  assert.equal(categoryFor({ categorySlug: 'real-estate' }).title, 'Buying a Home');
  assert.equal(categoryFor({}), null);
});
