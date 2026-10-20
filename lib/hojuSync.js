// Publishes English versions of 호주주민 blog posts (Sanity kkawsldi) to the Knowledge Hub (Sanity 7zclms7z).
// Flow: fetch Korean post → translate (Claude) → mechanical checks → independent review (Claude) → write.
//   new post + review PASS   → published article
//   new post + review ISSUES → draft only, email asks for approval
//   existing article         → draft over the live one, email
//   any failure              → nothing written, email
// Used by app/api/hoju-sync/route.js (webhook) and scripts/backfill-hoju.js.

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@sanity/client';
import { getWriteClient } from './sanityWrite.js';
import { categoryFor } from './categories.js';

const MODEL = 'claude-opus-5-5';
const SITE_URL = 'https://haedenfinance.com.au';
// shortcut: Resend only delivers to the account owner until haedenfinance.com.au is verified there; then set RESEND_FROM and SYNC_NOTIFY_EMAIL.
const NOTIFY_TO = process.env.SYNC_NOTIFY_EMAIL || 'hanson0823@gmail.com';

const sourceClient = createClient({ projectId: 'kkawsldi', dataset: 'production', apiVersion: '2024-01-01', useCdn: false });

const SOURCE_QUERY = `*[_type == "post" && _id == $id][0]{
  _id, _rev, title, "slug": slug.current, excerpt, asOfDate, region, roadmapId, contentHash,
  "categorySlug": category->slug.current, keyTakeaways, faq[]{question, answer}, sources[]{title, url}, body
}`;

export const articleId = postId => `article-hoju-${postId}`;
// Posts with neither a published English article nor a draft (a draft = already translated, awaiting approval).
export const missingPostIds = (postIds, existingIds) => {
  const have = new Set(existingIds.map(id => id.replace(/^drafts\./, '')));
  return postIds.filter(p => !have.has(articleId(p)));
};
export const studioUrl = id =>`${SITE_URL}/studio/intent/edit/id=${id};type=article`;

// ── Korean post → compact JSON for the model ─────────────────────────────────

function spanText(block) {
  const defs = Object.fromEntries((block.markDefs || []).map(d => [d._key, d]));
  return (block.children || []).map(c => {
    let t = c.text || '';
    if (!t) return '';
    const marks = c.marks || [];
    if (marks.includes('strong')) t = `**${t}**`;
    const link = marks.map(m => defs[m]).find(d => d?._type === 'link');
    // roadmapLink = internal 호주주민 link → plain text. Lead-form links are dropped with the CTA.
    if (link?.href && !/leadconnector/i.test(link.href)) t = `[${t}](${link.href})`;
    return t;
  }).join('');
}

export function simplifyBody(body = []) {
  return body.flatMap(b => {
    if (b._type === 'table') return [{ kind: 'table', text: '', rows: (b.rows || []).map(r => r.cells || []) }];
    if (b._type !== 'block') return [];
    const kind = b.listItem === 'bullet' ? 'bullet' : b.listItem === 'number' ? 'number'
      : b.style === 'blockquote' ? 'quote' : ['h2', 'h3', 'h4'].includes(b.style) ? b.style : b.style === 'h1' ? 'h2' : 'p';
    const text = spanText(b);
    return text.trim() ? [{ kind, text, rows: [] }] : [];
  });
}

const sourceLinks = post => new Set([
  ...(post.sources || []).map(s => s.url),
  ...simplifyBody(post.body).flatMap(b => [...b.text.matchAll(/\]\(([^)\s]+)\)/g)].map(m => m[1])),
]);

// ── Claude calls ────────────────────────────────────────────────────────────

const TRANSLATION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'summary', 'keyTakeaways', 'blocks', 'faq', 'sourceTitles'],
  properties: {
    title: { type: 'string' },
    summary: { type: 'string' },
    keyTakeaways: { type: 'array', items: { type: 'string' } },
    blocks: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['kind', 'text', 'rows'],
        properties: {
          kind: { type: 'string', enum: ['h2', 'h3', 'h4', 'p', 'quote', 'bullet', 'number', 'table'] },
          text: { type: 'string' },
          rows: { type: 'array', items: { type: 'array', items: { type: 'string' } } },
        },
      },
    },
    faq: {
      type: 'array',
      items: { type: 'object', additionalProperties: false, required: ['question', 'answer'], properties: { question: { type: 'string' }, answer: { type: 'string' } } },
    },
    sourceTitles: { type: 'array', items: { type: 'string' } },
  },
};

const REVIEW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'issues'],
  properties: {
    verdict: { type: 'string', enum: ['PASS', 'ISSUES'] },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['kind', 'detail', 'english', 'korean'],
        properties: {
          kind: { type: 'string', enum: ['fact', 'tone', 'compliance'] },
          detail: { type: 'string' },
          english: { type: 'string' },
          korean: { type: 'string' },
        },
      },
    },
  },
};

// Removals the translator is told to make; the reviewer must not flag these.
const ALLOWED_REMOVALS = `- Korean-community framing (e.g. "as Korean Australians", "for our Korean community", references to Korea or Korean-language help).
- The closing Korean call to action and its enquiry-form link.
- Any quokka mascot reference.
- Internal links to other 호주주민 articles (the link text may stay as plain wording, or a sentence that only says "see our other article on X" may be dropped).
- Korean-only explanations of English terms (e.g. "페이슬립(Payslip)" becomes just "payslip").`;

const TRANSLATOR_SYSTEM = `You adapt Korean-language home-loan education articles into English for the Knowledge Hub of Haeden Finance, a licensed mortgage broker in Queensland, Australia. The English article is published under Haeden's name as its own article.

Write polished, natural Australian English (Australian spelling, e.g. "organise", "favour"), not a literal translation. Keep the original's friendly, plain-language, educational tone.

Accuracy rules — these matter more than style:
- Keep every fact, number, percentage, dollar amount, date and "as at" date exactly as in the Korean. Do not add facts, examples, figures or advice that are not in the Korean.
- Keep every Queensland-versus-national distinction exactly as stated.
- Keep "varies by lender" / "depends on the lender" wording wherever the Korean has it.
- No approval guarantees, no recommending particular lenders, no hype or sales language.

Remove these 호주주민-specific parts (only these):
${ALLOWED_REMOVALS}

Do not write a call to action, contact details or a disclaimer — the site adds its own.

Format:
- "blocks" mirrors the Korean body in order. kind is h2/h3/h4/p/quote/bullet/number/table. For tables put the cells in "rows" (first row is the header) and leave "text" empty; for every other kind "rows" is [].
- Inline formatting in "text": **bold** and [link text](url) only. Keep external links (e.g. ABS, RBA, ATO) with their exact URLs. Never invent a URL.
- "keyTakeaways" and "faq" are the same length and order as the Korean. "sourceTitles" translates each source title, same length and order.
- "summary" is the English version of the Korean excerpt (one or two sentences, keep its "as at" date if it has one).
- Use Australian terms: "lender", "home loan", "offset account", "stamp duty / transfer duty", "LMI", "First Home Owner Grant".`;

const REVIEWER_SYSTEM = `You are a compliance and accuracy reviewer for Haeden Finance, a licensed Queensland mortgage broker. Someone else adapted a Korean education article into English. You did not write it. Compare the English draft against the Korean source and decide whether it can be published without a human check.

Check two things:
(a) Facts: every fact, number, percentage, dollar amount, date, "as at" date, and Queensland-versus-national statement in the English matches the Korean. Nothing is added and nothing is dropped, except the planned removals listed below. "Varies by lender" style qualifiers must survive.
(b) Tone: the English matches the intent of the Korean — friendly, plain-language, educational. No hype, no sales pressure, no approval guarantees, no recommending particular lenders.

Planned removals (do NOT flag these):
${ALLOWED_REMOVALS}
- The English has no call to action, contact details or disclaimer; the site adds those separately.

Rephrasing, reordering within a paragraph and natural Australian wording are fine. Only flag something a careful compliance reviewer would want a human to look at. For each issue quote the English and the matching Korean (empty string if there is none). verdict is PASS only when issues is empty.`;

let anthropic;
async function callClaude(system, payload, schema, effort) {
  anthropic ??= new Anthropic();
  const message = await anthropic.beta.messages.stream({
    model: MODEL,
    max_tokens: 64000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    thinking: { type: 'adaptive' },
    output_config: { effort, format: { type: 'json_schema', schema } },
    system,
    messages: [{ role: 'user', content: JSON.stringify(payload) }],
  }).finalMessage();
  if (message.stop_reason !== 'end_turn') throw new Error(`Claude stopped with ${message.stop_reason}`);
  const text = message.content.find(b => b.type === 'text')?.text;
  if (!text) throw new Error('Claude returned no text');
  return { result: JSON.parse(text), model: message.model };
}

function koreanPayload(post) {
  return {
    title: post.title,
    excerpt: post.excerpt || '',
    keyTakeaways: post.keyTakeaways || [],
    body: simplifyBody(post.body),
    faq: (post.faq || []).map(f => ({ question: f.question, answer: f.answer })),
    sourceTitles: (post.sources || []).map(s => s.title),
  };
}

// ── Mechanical checks (run before the reviewer; any failure means nothing is written) ──

export function checkTranslation(en, post) {
  const errors = [];
  const ko = koreanPayload(post);
  const all = JSON.stringify(en);
  if (!en.title?.trim()) errors.push('empty title');
  if (/[ᄀ-ᇿ㄰-㆏가-힣]/.test(all)) errors.push('Korean text left in the English');
  if (/leadconnector|quokka|호주주민|hoju/i.test(all)) errors.push('호주주민-specific content left in (lead form, quokka or brand name)');
  if (en.blocks.length < Math.ceil(ko.body.length * 0.4)) errors.push(`only ${en.blocks.length} body blocks for ${ko.body.length} in Korean`);
  if (en.keyTakeaways.length !== ko.keyTakeaways.length) errors.push('key takeaways count differs');
  if (en.faq.length !== ko.faq.length) errors.push('FAQ count differs');
  if (en.sourceTitles.length !== ko.sourceTitles.length) errors.push('source count differs');
  if (en.blocks.filter(b => b.kind === 'table').length !== ko.body.filter(b => b.kind === 'table').length) errors.push('table count differs');
  const allowed = sourceLinks(post);
  for (const [, url] of all.matchAll(/\]\(([^)\s]+)\)/g)) if (!allowed.has(url)) errors.push(`link not in the Korean source: ${url}`);
  return errors;
}

// ── English JSON → Portable Text ─────────────────────────────────────────────

export function inlineSpans(text, key) {
  const children = [];
  const markDefs = [];
  let last = 0;
  const push = (t, marks = []) => t && children.push({ _type: 'span', _key: `${key}s${children.length}`, text: t, marks });
  for (const m of text.matchAll(/\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g)) {
    push(text.slice(last, m.index));
    if (m[1] !== undefined) push(m[1], ['strong']);
    else {
      const mk = `${key}m${markDefs.length}`;
      markDefs.push({ _type: 'link', _key: mk, href: m[3] });
      push(m[2], [mk]);
    }
    last = m.index + m[0].length;
  }
  push(text.slice(last));
  if (!children.length) push(' ');
  return { children, markDefs };
}

const asAtMonth = d => d && new Date(`${d.slice(0, 10)}T00:00:00Z`).toLocaleDateString('en-AU', { month: 'long', year: 'numeric', timeZone: 'UTC' });

const DISCLAIMER = 'General information only. This article does not take into account your objectives, financial situation or needs and is not credit, tax or legal advice. Lending criteria, rates and fees vary by lender and can change. Before acting, consider whether the information is appropriate for you and seek advice specific to your circumstances.';
const CTA = 'Want to talk through how this applies to your situation? [Get in touch with our team](/#contact).';

export function toPortableText(en, post) {
  const out = [];
  const add = (kind, text) => {
    const key = `b${out.length}`;
    const style = ['h2', 'h3', 'h4'].includes(kind) ? kind : kind === 'quote' ? 'blockquote' : 'normal';
    const block = { _type: 'block', _key: key, style, ...inlineSpans(text, key) };
    if (kind === 'bullet' || kind === 'number') Object.assign(block, { listItem: kind, level: 1 });
    out.push(block);
  };

  const asAt = asAtMonth(post.asOfDate);
  const scope = post.region === 'qld' ? 'Queensland' : post.region === 'national' ? 'applies Australia-wide' : null;
  if (asAt || scope) add('p', `**${[asAt && `Information as at ${asAt}`, scope].filter(Boolean).join(' · ')}**`);

  if (en.keyTakeaways.length) {
    add('h2', 'Key takeaways');
    en.keyTakeaways.forEach(t => add('number', t));
  }
  for (const b of en.blocks) {
    if (b.kind === 'table') {
      const key = `b${out.length}`;
      out.push({ _type: 'table', _key: key, rows: b.rows.map((cells, i) => ({ _type: 'tableRow', _key: `${key}r${i}`, cells })) });
    } else add(b.kind, b.text);
  }
  if (en.faq.length) {
    add('h2', 'Frequently asked questions');
    en.faq.forEach(f => { add('h3', f.question); add('p', f.answer); });
  }
  const sources = post.sources || [];
  if (sources.length) {
    add('h2', 'Sources');
    sources.forEach((s, i) => add('bullet', `[${en.sourceTitles[i]}](${s.url})`));
  }
  add('p', CTA);
  add('quote', DISCLAIMER);
  return out;
}

// ── Notification ────────────────────────────────────────────────────────────

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export async function notify(subject, lines, link) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return console.warn('RESEND_API_KEY not set — hoju-sync email not sent:', subject);
  const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0D1B2A;">
    ${lines.map(l => `<p style="margin:0 0 12px;line-height:1.5;">${l}</p>`).join('')}
    ${link ? `<p style="margin:20px 0;"><a href="${esc(link)}" style="background:#0D1B2A;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">Open in Studio</a></p>` : ''}
    <p style="font-size:12px;color:#999;">Sent by the 호주주민 → Knowledge Hub sync.</p></div>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ from: process.env.RESEND_FROM || 'Haeden Finance <onboarding@resend.dev>', to: NOTIFY_TO, subject, html }),
  });
  if (!res.ok) console.error('Resend error:', res.status, await res.text());
}

const issueLines = issues => issues.map(i => `<b>${esc(i.kind)}</b>: ${esc(i.detail)}${i.english ? `<br><i>EN:</i> ${esc(i.english)}` : ''}${i.korean ? `<br><i>KO:</i> ${esc(i.korean)}` : ''}`);

// ── Orchestration ───────────────────────────────────────────────────────────

// opts.dryRun: translate + review, write nothing, return the document. opts.force: ignore the unchanged-hash skip.
export async function syncPost(postId, { dryRun = false, force = false } = {}) {
  const post = await sourceClient.fetch(SOURCE_QUERY, { id: postId });
  if (!post) return { status: 'not-found', postId };

  const write = getWriteClient();
  const id = articleId(postId);
  const draftId = `drafts.${id}`;
  const hash = post.contentHash || post._rev;
  const { pub, draft } = await write.fetch('{"pub": *[_id == $id][0]{sourceHash}, "draft": *[_id == $draftId][0]{sourceHash}}', { id, draftId });
  if (!dryRun && !force && (draft ? draft.sourceHash === hash : pub?.sourceHash === hash)) return { status: 'unchanged', postId, id };
  const isNew = !pub;

  try {
    const { result: en } = await callClaude(TRANSLATOR_SYSTEM, koreanPayload(post), TRANSLATION_SCHEMA, 'high');
    const errors = checkTranslation(en, post);
    if (errors.length) throw new Error(`translation failed checks: ${errors.join('; ')}`);

    const { result: review, model } = await callClaude(REVIEWER_SYSTEM, { korean: koreanPayload(post), english: en }, REVIEW_SCHEMA, 'high');
    const verdict = review.issues.length ? 'ISSUES' : review.verdict;
    const category = categoryFor(post);
    const doc = {
      _type: 'article',
      title: en.title,
      summary: en.summary,
      category: category?.title,
      icon: category?.icon || 'article',
      bg: category?.bg || 'navy',
      content: toPortableText(en, post),
      sourcePostId: post._id,
      sourceSlug: post.slug,
      sourceHash: hash,
      review: { verdict, issues: review.issues.map((i, n) => ({ _type: 'reviewIssue', _key: `i${n}`, ...i })), model, reviewedAt: new Date().toISOString() },
    };
    if (dryRun) return { status: 'dry-run', postId, id, isNew, verdict, doc, en };

    if (isNew && verdict === 'PASS') {
      await write.transaction().createOrReplace({ _id: id, ...doc }).delete(draftId).commit();
      await notify(`Published: ${en.title}`, [
        `A new 호주주민 article was translated, passed review and is now live in the Knowledge Hub.`,
        `<b>${esc(en.title)}</b> · ${esc(doc.category)}`,
      ], studioUrl(id));
      return { status: 'published', postId, id, verdict };
    }

    await write.createOrReplace({ _id: draftId, ...doc });
    const head = isNew
      ? 'A new 호주주민 article was translated, but the reviewer flagged issues, so it was saved as a draft and is <b>not live</b>.'
      : `The Korean article was updated, so a new English draft was saved over the live article. The live version is unchanged until you publish the draft.${verdict === 'PASS' ? ' The reviewer found no issues.' : ' The reviewer flagged issues:'}`;
    await notify(`${verdict === 'PASS' ? 'Draft ready' : 'Needs approval'}: ${en.title}`, [
      head,
      ...(verdict === 'PASS' ? [] : issueLines(review.issues)),
      'To approve, open it in Studio, check the text and tap <b>Publish</b>. To reject, edit it or discard the draft.',
    ], studioUrl(id));
    return { status: 'draft', postId, id, isNew, verdict };
  } catch (err) {
    if (!dryRun) {
      await notify(`Sync failed: ${post.title}`, [
        `The English version of a 호주주민 article could not be produced, so nothing was written to the Knowledge Hub.`,
        `<b>Post:</b> ${esc(post._id)} (${esc(post.slug)})<br><b>Error:</b> ${esc(err.message)}`,
        `Retry with <code>node scripts/backfill-hoju.js --id ${esc(post._id)} --force</code>, or edit the Korean post to trigger the webhook again.`,
      ]);
    }
    throw err;
  }
}
