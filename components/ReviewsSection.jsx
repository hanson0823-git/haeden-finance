const defaultTestimonials = [
  {
    _id: '1',
    name: 'Sarah & James Mitchell',
    role: 'First Home Buyers, Sydney',
    initials: 'SJ',
    body: 'As first home buyers, we had no idea where to start. Haeden Finance held our hand through every step. They found us a rate we didn\'t think was possible on our budget, and we were in our home within 8 weeks. Truly exceptional service.',
    featured: true,
  },
  {
    _id: '2',
    name: 'Michael Chen',
    role: 'Property Investor, Melbourne',
    initials: 'MC',
    body: 'I\'ve worked with several brokers over the years, but Haeden Finance is on a different level. They restructured my entire portfolio and unlocked equity I didn\'t know I had. My borrowing capacity increased significantly. Highly recommended.',
    featured: false,
  },
  {
    _id: '3',
    name: 'Priya Sharma',
    role: 'Self-Employed Business Owner, Brisbane',
    initials: 'PS',
    body: 'Being self-employed, I\'d been knocked back twice by banks. Haeden Finance understood my financials immediately and had me approved within two weeks. They\'re experts at navigating complex situations. I can\'t thank them enough.',
    featured: false,
  },
  {
    _id: '4',
    name: 'David & Emma Thompson',
    role: 'Refinancers, Perth',
    initials: 'DT',
    body: 'We were paying too much on our mortgage for years. One call with Haeden Finance and they found us a deal that saves us $450 a month. They handled everything — we just signed the forms. Wish we\'d called them sooner!',
    featured: true,
  },
  {
    _id: '5',
    name: 'Marcus Williams',
    role: 'Construction Loan, Adelaide',
    initials: 'MW',
    body: 'Building our custom home seemed like a financial nightmare until Haeden stepped in. They managed the progressive drawdowns perfectly and kept us on budget. The communication was outstanding throughout.',
    featured: false,
  },
  {
    _id: '6',
    name: 'Lisa Nguyen',
    role: 'Investment Refinancing, Gold Coast',
    initials: 'LN',
    body: 'Haeden Finance helped me consolidate my investment portfolio into a smarter structure. Their knowledge of tax implications and loan structures is impressive. Professional, responsive, and genuinely care about your success.',
    featured: false,
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className="material-symbols-outlined filled text-base" style={{ color: '#F5C200' }}>
          star
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const { featured, name, role, initials, body } = testimonial;

  return (
    <div
      className={`rounded-2xl p-7 flex flex-col transition-transform duration-200 ${featured ? 'shadow-2xl scale-[1.02]' : 'shadow-md'}`}
      style={{
        background: featured ? '#0D1B2A' : 'white',
        zIndex: featured ? 2 : 1,
        position: 'relative',
      }}
    >
      <StarRating />

      <blockquote
        className="font-body text-sm leading-relaxed italic flex-1 mb-6"
        style={{ color: featured ? 'rgba(255,255,255,0.82)' : '#5A5A6A' }}
      >
        "{body}"
      </blockquote>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: featured ? '#F5C200' : '#0D1B2A',
          }}
        >
          <span
            className="font-headline font-bold text-xs"
            style={{ color: featured ? '#0D1B2A' : '#F5C200' }}
          >
            {initials || name?.charAt(0) || '?'}
          </span>
        </div>
        <div>
          <p
            className="font-headline font-bold text-sm"
            style={{ color: featured ? 'white' : '#0D1B2A' }}
          >
            {name}
          </p>
          <p
            className="font-body text-xs"
            style={{ color: featured ? 'rgba(255,255,255,0.5)' : '#9A9AAA' }}
          >
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection({ testimonials }) {
  const items = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section id="reviews" style={{ background: '#FAF6EE' }}>
      <div className="container-xl section-padding">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Client Stories</span>
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl leading-tight" style={{ color: '#0D1B2A' }}>
            Voices of Partnership
          </h2>
          <p className="font-body text-lg mt-4 max-w-xl mx-auto" style={{ color: '#5A5A6A' }}>
            Real stories from real clients who trusted us with one of life's biggest decisions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(t => (
            <TestimonialCard key={t._id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
