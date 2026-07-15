'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Does it cost me anything to use a mortgage broker?',
    answer:
      'In most cases, no. Our credit assistance is generally provided at no direct cost to you — we are paid a commission by the lender when your loan settles. We disclose any commissions we expect to receive before you accept a recommendation, so there are no surprises.',
  },
  {
    question: 'How much can I borrow?',
    answer:
      'Your borrowing capacity depends on your income, expenses, existing debts, deposit, and the lender’s assessment criteria — and it can vary significantly between lenders. That’s where we add value: we know which lenders will look most favourably on your situation. Book a free consultation and we’ll give you a realistic figure.',
  },
  {
    question: 'How is a broker different from going to my bank?',
    answer:
      'Your bank can only offer you its own products. As brokers, we compare loans from a panel of 40+ banks and lenders and negotiate on your behalf — which often means a sharper rate, a better structure, or approval where a single bank might say no.',
  },
  {
    question: 'How long does loan approval take?',
    answer:
      'It varies by lender and the complexity of your situation — anywhere from a couple of days to a few weeks. We prepare your application thoroughly before submission and choose lenders with turnaround times that suit your deadline, which helps avoid delays.',
  },
  {
    question: 'Can you help if I’m self-employed or have a complex income?',
    answer:
      'Yes — this is one of our specialties. We know which lenders understand self-employed income, how to present your financials in the best light, and which low-doc or alt-doc options are available if your paperwork isn’t standard.',
  },
  {
    question: 'What happens after my loan settles?',
    answer:
      'We stay your long-term partner. We conduct regular loan reviews to make sure your rate and structure still serve you, and we’re a phone call away whenever your circumstances change — whether that’s renovating, investing, or refinancing.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ background: 'white', border: '1px solid #E8E2D4' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-headline font-bold text-base md:text-lg" style={{ color: '#0D1B2A' }}>
          {faq.question}
        </span>
        <span
          className="material-symbols-outlined text-2xl flex-shrink-0 transition-transform duration-200"
          style={{ color: '#F5C200', transform: isOpen ? 'rotate(180deg)' : 'none' }}
        >
          expand_more
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '400px' : '0' }}
      >
        <p className="font-body text-sm md:text-base leading-relaxed px-6 pb-6" style={{ color: '#5A5A6A' }}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" style={{ background: '#FAF6EE' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="container-xl section-padding">
        <div className="text-center mb-14">
          <span className="section-label">Common Questions</span>
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl leading-tight" style={{ color: '#0D1B2A' }}>
            Frequently Asked Questions
          </h2>
          <p className="font-body text-lg mt-4 max-w-xl mx-auto" style={{ color: '#5A5A6A' }}>
            Straight answers to the questions we hear most often.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-body text-base mb-5" style={{ color: '#5A5A6A' }}>
            Still have questions? We're happy to help.
          </p>
          <a href="#contact" className="btn-gold text-base">
            Ask Us Anything
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
