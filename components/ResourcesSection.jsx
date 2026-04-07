'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const defaultArticles = [
  { _id: '1', category: 'First Home Buyers', title: 'The Complete Guide to Your First Home Loan in 2024', summary: 'Everything you need to know about buying your first home in Australia — from saving your deposit to getting the keys. Includes government grants and schemes.', icon: 'home', bg: 'navy' },
  { _id: '2', category: 'Investing', title: 'How to Maximise Your Borrowing Power as a Property Investor', summary: 'Smart loan structuring strategies that experienced investors use to build their portfolios faster without overextending their finances.', icon: 'trending_up', bg: 'gold' },
  { _id: '3', category: 'Refinancing', title: "5 Signs It's Time to Refinance Your Home Loan", summary: "Not sure if refinancing is right for you? These five indicators will help you decide whether it's time to switch lenders and start saving.", icon: 'refresh', bg: 'grey' },
  { _id: '4', category: 'Self-Employed', title: "Getting a Mortgage When You're Self-Employed: What You Need to Know", summary: "Self-employment shouldn't stop you from owning property. We break down the documentation, lender preferences, and strategies that work.", icon: 'business_center', bg: 'cream' },
  { _id: '5', category: 'Market Insights', title: 'Interest Rate Outlook: What Borrowers Need to Know in 2024', summary: 'A clear-eyed look at where interest rates are heading and how to position your mortgage strategy to protect yourself regardless of what the RBA does next.', icon: 'bar_chart', bg: 'navy' },
  { _id: '6', category: 'Construction', title: 'Construction Loans Explained: Building Your Dream Home', summary: 'Understanding progressive drawdowns, interest-only periods, and how to manage cash flow when building a new home from the ground up.', icon: 'construction', bg: 'gold' },
];

export const bgStyles = {
  navy: { background: '#0D1B2A', iconColor: '#F5C200' },
  gold: { background: '#F5C200', iconColor: '#0D1B2A' },
  grey: { background: '#E8E8EE', iconColor: '#0D1B2A' },
  cream: { background: '#F0EAD8', iconColor: '#C69B00' },
};

export function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'white' }}>
        <div className="h-48 relative" style={{ background: bgStyles[article.bg]?.background || '#0D1B2A' }}>
          {article.image?.asset?.url ? (
            <Image src={article.image.asset.url} alt={article.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl" style={{ color: bgStyles[article.bg]?.iconColor || '#F5C200' }}>
                {article.icon || 'article'}
              </span>
            </div>
          )}
        </div>
        <div className="p-8">
          <span className="inline-block font-headline font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: '#F5C200', color: '#0D1B2A' }}>
            {article.category}
          </span>
          <h2 className="font-headline font-extrabold text-2xl mb-4" style={{ color: '#0D1B2A' }}>
            {article.title}
          </h2>
          <p className="font-body text-sm leading-relaxed" style={{ color: '#5A5A6A' }}>
            {article.summary}
          </p>
          {article.content && (
            <p className="font-body text-sm leading-relaxed mt-4" style={{ color: '#5A5A6A' }}>
              {article.content}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        >
          <span className="material-symbols-outlined text-lg text-white">close</span>
        </button>
      </div>
    </div>
  );
}

export function ArticleCard({ article, onClick }) {
  const style = bgStyles[article.bg] || bgStyles.navy;

  return (
    <div
      className="rounded-2xl overflow-hidden card-hover cursor-pointer flex flex-col"
      style={{ background: 'white' }}
      onClick={() => onClick(article)}
    >
      <div className="h-44 relative flex-shrink-0" style={{ background: style.background }}>
        {article.image?.asset?.url ? (
          <Image src={article.image.asset.url} alt={article.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl" style={{ color: style.iconColor }}>
              {article.icon || 'article'}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="inline-block font-headline font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3 self-start" style={{ background: '#F5C200', color: '#0D1B2A' }}>
          {article.category}
        </span>
        <h3 className="font-headline font-bold text-base mb-2 leading-snug flex-1" style={{ color: '#0D1B2A' }}>
          {article.title}
        </h3>
        <p className="font-body text-xs leading-relaxed mb-4" style={{ color: '#5A5A6A' }}>
          {article.summary}
        </p>
        <span className="font-headline font-bold text-sm" style={{ color: '#C69B00' }}>
          Read more →
        </span>
      </div>
    </div>
  );
}

export default function ResourcesSection({ articles }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const allItems = articles && articles.length > 0 ? articles : defaultArticles;
  const items = allItems.slice(0, 3);

  return (
    <section id="resources" style={{ background: '#F0EAD8' }}>
      <div className="container-xl section-padding">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Learn & Grow</span>
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl leading-tight" style={{ color: '#0D1B2A' }}>
            Knowledge Hub
          </h2>
          <p className="font-body text-lg mt-4 max-w-xl mx-auto" style={{ color: '#5A5A6A' }}>
            Expert insights to help you make smarter property and finance decisions.
          </p>
        </div>

        {/* Grid — latest 3 only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(article => (
            <ArticleCard key={article._id} article={article} onClick={setSelectedArticle} />
          ))}
        </div>

        {/* View All button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-3 font-headline font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: '#0D1B2A', color: 'white' }}
          >
            View All Articles
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>
        </div>
      </div>

      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </section>
  );
}
