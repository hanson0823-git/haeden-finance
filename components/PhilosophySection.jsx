import Image from 'next/image';

const features = [
  {
    icon: 'handshake',
    title: 'Dedicated Advocacy',
    description:
      'We go beyond simply placing your loan. We fight for the best terms, rates, and structure that align with your financial goals.',
  },
  {
    icon: 'visibility',
    title: 'Radical Transparency',
    description:
      'No hidden fees, no confusing jargon. We explain every step in plain English so you can make confident, informed decisions.',
  },
  {
    icon: 'support_agent',
    title: 'Unwavering Support',
    description:
      'Our relationship doesn\'t end at settlement. We\'re your long-term mortgage partner, available whenever you need guidance.',
  },
];

export default function PhilosophySection({ settings }) {
  const philosophyImage = settings?.philosophyImage?.asset?.url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuChxP4_IbFfNDE4q3OPB8PHnTsmdI2_wEHgQuyaSr5lxqoEQYkGLHR38BliyTZmzmthvZNBy_QU090eRTz3FPpOx0KVeNEoEhe7Cjo_ESGvIfWyOz0kHbDkOlXFrrTRHt468FZuwRhRxLwLKgT5uUK1Oyl6q7XZ0thv0NVqt1eYq1b9bbtljmrYKiRLyKnW6iCaFeU5xrzwrViuJ1mHIzSLPhWgFr8otbit4S8cpA0sYVtF7chWXUZyb7W0XhmfOVXsdcaZuQ_dxZs';
  const heading = settings?.philosophyHeading || 'The Haeden Partnership';
  const body =
    settings?.philosophyBody ||
    'At Haeden Finance, we believe the mortgage process should feel empowering, not overwhelming. We\'re not just brokers — we\'re your dedicated advocates, working tirelessly to secure the right solution for your unique circumstances. With deep market expertise and genuine care for every client, we turn what\'s often a stressful experience into a clear, confident journey toward your property goals.';

  return (
    <section id="philosophy" style={{ background: '#FAF6EE' }}>
      <div className="container-xl section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              {philosophyImage ? (
                <Image
                  src={philosophyImage}
                  alt="Haeden Finance philosophy"
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: '#0D1B2A' }}
                >
                  <span className="material-symbols-outlined text-8xl" style={{ color: '#F5C200' }}>
                    handshake
                  </span>
                </div>
              )}
            </div>

            {/* Accent quote box */}
            <div
              className="absolute -bottom-6 -right-6 rounded-xl p-5 shadow-xl max-w-xs"
              style={{ background: '#F5C200' }}
            >
              <p className="font-headline font-bold text-sm leading-snug" style={{ color: '#0D1B2A' }}>
                "We don't just broker — we advocate for you at every turn."
              </p>
              <p className="font-body text-xs mt-2 font-semibold" style={{ color: '#0D1B2A', opacity: 0.7 }}>
                — Haeden Finance
              </p>
            </div>
          </div>

          {/* Text content */}
          <div>
            <span className="section-label">Our Philosophy</span>
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl leading-tight mb-6" style={{ color: '#0D1B2A' }}>
              {heading}
            </h2>
            <p className="font-body text-lg leading-relaxed mb-10" style={{ color: '#5A5A6A' }}>
              {body}
            </p>

            {/* Feature cards */}
            <div className="flex flex-col gap-5">
              {features.map(feat => (
                <div key={feat.title} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: '#0D1B2A' }}
                  >
                    <span className="material-symbols-outlined text-xl" style={{ color: '#F5C200' }}>
                      {feat.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base mb-1" style={{ color: '#0D1B2A' }}>
                      {feat.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: '#5A5A6A' }}>
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
