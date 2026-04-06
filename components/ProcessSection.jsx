const steps = [
  {
    number: '01',
    icon: 'chat',
    title: 'Free Consultation',
    description:
      'We start with a relaxed, no-obligation conversation to understand your situation, goals, and timeline. No jargon, no pressure — just an honest discussion about your options.',
    theme: 'default',
  },
  {
    number: '02',
    icon: 'manage_search',
    title: 'Strategy & Research',
    description:
      'We analyse your financial position, assess your borrowing capacity, and research our panel of 40+ lenders to identify the best loan structure and rate for your needs.',
    theme: 'default',
  },
  {
    number: '03',
    icon: 'description',
    title: 'Application & Advocacy',
    description:
      'We prepare a compelling application and submit it on your behalf. We liaise directly with lenders, handle all the paperwork, and keep you updated every step of the way.',
    theme: 'default',
  },
  {
    number: '04',
    icon: 'celebration',
    title: 'Settlement & Beyond',
    description:
      'We celebrate your success and remain your long-term partner. We conduct regular loan reviews to ensure your mortgage continues to serve your evolving financial goals.',
    theme: 'gold',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" style={{ background: '#0D1B2A' }}>
      <div className="container-xl section-padding">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label section-label-light">The Journey</span>
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-white leading-tight">
            How It Works
          </h2>
          <p className="font-body text-lg mt-4 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            A clear, simple process designed to get you to your property goals with confidence.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(step => {
            const isGold = step.theme === 'gold';
            return (
              <div
                key={step.number}
                className="rounded-2xl p-7 flex flex-col"
                style={{
                  background: isGold ? '#F5C200' : 'rgba(255,255,255,0.05)',
                  border: isGold ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Step number */}
                <span
                  className="font-headline font-extrabold text-5xl leading-none mb-5"
                  style={{ color: isGold ? 'rgba(13,27,42,0.2)' : 'rgba(245,194,0,0.15)' }}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: isGold ? 'rgba(13,27,42,0.12)' : 'rgba(245,194,0,0.12)',
                  }}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ color: isGold ? '#0D1B2A' : '#F5C200' }}
                  >
                    {step.icon}
                  </span>
                </div>

                <h3
                  className="font-headline font-bold text-lg mb-3"
                  style={{ color: isGold ? '#0D1B2A' : 'white' }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: isGold ? 'rgba(13,27,42,0.72)' : 'rgba(255,255,255,0.62)' }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
