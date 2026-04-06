const challenges = [
  {
    icon: 'family_restroom',
    title: 'First Home Buyers',
    description:
      'Navigating your first home loan can feel overwhelming. We simplify the process, help you access government grants, and get you into your first home sooner.',
    color: '#0D1B2A',
    iconColor: '#F5C200',
  },
  {
    icon: 'work',
    title: 'Self-Employed Buyers',
    description:
      'Complex income structures shouldn\'t hold you back. We know which lenders understand self-employment and how to present your financials in the best light.',
    color: '#0D1B2A',
    iconColor: '#F5C200',
  },
  {
    icon: 'trending_up',
    title: 'Property Investors',
    description:
      'Building a portfolio requires smart financing. We structure your loans to maximise borrowing power, tax efficiency, and long-term growth potential.',
    color: '#0D1B2A',
    iconColor: '#F5C200',
  },
  {
    icon: 'refresh',
    title: 'Refinancers',
    description:
      'Are you paying too much? We review your current loan, compare hundreds of options, and move your mortgage to a better deal — often saving thousands.',
    color: '#0D1B2A',
    iconColor: '#F5C200',
  },
  {
    icon: 'credit_score',
    title: 'Credit-Challenged Buyers',
    description:
      'A difficult credit history doesn\'t have to mean no. We have access to specialist lenders who assess applications on merit, not just credit scores.',
    color: '#0D1B2A',
    iconColor: '#F5C200',
  },
  {
    icon: 'chat',
    title: 'Your Situation',
    description:
      'Every client is different. Whatever your circumstances, let\'s have a free, no-obligation conversation about your options.',
    color: '#F5C200',
    iconColor: '#0D1B2A',
    cta: true,
  },
];

export default function ChallengeSection() {
  return (
    <section style={{ background: '#0D1B2A' }}>
      <div className="container-xl section-padding">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label section-label-light">Who We Help</span>
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-white leading-tight">
            Every Client Faces a<br />Different Challenge
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {challenges.map(ch => (
            <div
              key={ch.title}
              className="rounded-2xl p-7 card-hover flex flex-col"
              style={{
                background: ch.cta ? '#F5C200' : 'rgba(255,255,255,0.05)',
                border: ch.cta ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: ch.cta ? 'rgba(13,27,42,0.12)' : 'rgba(245,194,0,0.12)',
                }}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ color: ch.cta ? '#0D1B2A' : '#F5C200' }}
                >
                  {ch.icon}
                </span>
              </div>

              <h3
                className="font-headline font-bold text-lg mb-3"
                style={{ color: ch.cta ? '#0D1B2A' : 'white' }}
              >
                {ch.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed flex-1"
                style={{ color: ch.cta ? 'rgba(13,27,42,0.75)' : 'rgba(255,255,255,0.65)' }}
              >
                {ch.description}
              </p>

              {ch.cta && (
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 font-headline font-bold text-sm"
                  style={{ color: '#0D1B2A' }}
                >
                  Book a Free Chat
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
