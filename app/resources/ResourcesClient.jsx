'use client';

import { useState, useEffect } from 'react';
import { ArticleCard, ArticleModal, defaultArticles } from '../../components/ResourcesSection';
import { CATEGORIES } from '../../lib/categories';

export default function ResourcesClient() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/articles');
        if (res.ok) {
          const data = await res.json();
          setArticles(data.length > 0 ? data : defaultArticles);
        } else {
          setArticles(defaultArticles);
        }
      } catch {
        setArticles(defaultArticles);
      }
    }
    fetchArticles();
  }, []);

  const filtered = articles.filter(a => {
    const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
    const matchesSearch = !search || a.title?.toLowerCase().includes(search.toLowerCase()) || a.summary?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: '#0D1B2A' }}>
        <div className="container-xl text-center">
          <span className="section-label section-label-light">Learn & Grow</span>
          <h1 className="font-headline font-extrabold text-5xl md:text-6xl text-white leading-tight mb-6">
            Knowledge Hub
          </h1>
          <p className="font-body text-lg max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Expert insights to help you make smarter property and finance decisions.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl" style={{ color: 'rgba(255,255,255,0.4)' }}>search</span>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-yellow-400"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            />
          </div>
        </div>
      </section>

      {/* Articles */}
      <section style={{ background: '#F0EAD8' }}>
        <div className="container-xl section-padding">
          {/* Category filter: same sections, in the same order, as the 호주주민 blog */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {[{ title: 'All' }, ...CATEGORIES].map(cat => {
                const on = activeCategory === cat.title;
                return (
                  <button
                    key={cat.title}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActiveCategory(cat.title)}
                    className="inline-flex items-center gap-2 h-[42px] font-headline font-bold text-sm px-4 rounded-full border transition-colors duration-200"
                    style={{
                      background: on ? '#0D1B2A' : 'white',
                      color: on ? 'white' : '#0D1B2A',
                      borderColor: on ? '#0D1B2A' : '#D3DCE6',
                    }}
                  >
                    {cat.dot && <span className="h-2 w-2 rounded-full" style={{ background: cat.dot }} aria-hidden="true" />}
                    {cat.title}
                  </button>
                );
              })}
            </div>
            <p className="font-body text-sm sm:ml-auto" style={{ color: '#5A5A6A' }} aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(article => (
                <ArticleCard key={article._id} article={article} onClick={setSelectedArticle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl mb-4 block" style={{ color: '#9A9AAA' }}>search_off</span>
              <p className="font-headline font-bold text-lg" style={{ color: '#0D1B2A' }}>No articles found</p>
              <p className="font-body text-sm mt-2" style={{ color: '#5A5A6A' }}>Try a different search or category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0D1B2A' }}>
        <div className="container-xl py-20 text-center">
          <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-white mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="font-body text-lg mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Book a free consultation and let's talk about your property goals.
          </p>
          <a href="/#contact" className="btn-gold text-base">
            Get in Touch
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </a>
        </div>
      </section>

      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </>
  );
}
