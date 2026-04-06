'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

interface Article {
  _id: string
  category: string
  title: string
  summary?: string
  content?: unknown[]
  image?: { asset: { _ref: string } }
  icon?: string
  bg?: string
}

const bgClass: Record<string, string> = {
  navy:  'bg-navy text-gold',
  gold:  'bg-gold text-navy',
  light: 'bg-navy/10 text-navy',
  cream: 'bg-gold/15 text-gold-dark',
}

export default function Articles({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<Article | null>(null)

  if (!articles?.length) return null

  return (
    <>
      <section id="resources" className="py-28 bg-cream-dark">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <p className="text-gold-dark font-bold text-sm uppercase tracking-widest mb-4">Knowledge Hub</p>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-navy mb-4">Resources</h2>
              <p className="text-xl text-ink-muted max-w-xl leading-relaxed">Plain-English guides to help you understand the home loan process.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {articles.map(a => {
              const imgSrc = a.image?.asset ? urlFor(a.image).width(600).height(176).url() : null
              return (
                <article
                  key={a._id}
                  onClick={() => setSelected(a)}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  {imgSrc
                    ? <div className="h-44 overflow-hidden"><Image src={imgSrc} alt={a.title} width={600} height={176} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                    : <div className={`${bgClass[a.bg || 'navy'] || bgClass.navy} h-44 flex items-center justify-center`}><span className="material-symbols-outlined" style={{ fontSize: '3.5rem' }}>{a.icon || 'description'}</span></div>
                  }
                  <div className="p-7">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-dark bg-gold/10 px-3 py-1 rounded-full">{a.category}</span>
                    <h3 className="font-headline font-bold text-navy mt-4 mb-3 leading-snug group-hover:text-gold-dark transition-colors">{a.title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed mb-5">{a.summary}</p>
                    <span className="text-gold-dark font-bold text-sm group-hover:underline">Read more →</span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/75 z-[600] flex items-start justify-center p-4 overflow-y-auto"
          onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl overflow-hidden">
            <div className={`h-52 relative flex items-end ${selected.image?.asset ? '' : bgClass[selected.bg || 'navy'] || bgClass.navy}`}>
              {selected.image?.asset && (
                <Image src={urlFor(selected.image).width(800).height(208).url()} alt={selected.title} fill className="object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="relative z-20 p-7">
                <span className="text-xs font-bold uppercase tracking-widest bg-gold text-navy px-3 py-1 rounded-full">{selected.category}</span>
                <h2 className="font-headline font-extrabold text-white text-2xl mt-3 leading-snug">{selected.title}</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="article-content text-ink-muted text-base leading-relaxed">
                {selected.content
                  ? <PortableText value={selected.content as never} />
                  : <p>{selected.summary}</p>
                }
              </div>
              <div className="mt-8 pt-6 border-t border-cream-dark flex justify-end">
                <button onClick={() => setSelected(null)} className="bg-navy text-white font-bold px-8 py-3 rounded-lg hover:bg-navy-mid transition-colors">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
