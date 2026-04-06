import Image from 'next/image';

const defaultServices = [
  {
    _id: '1',
    title: 'Home Loans & Mortgages',
    description:
      'Whether you\'re buying your first home, upgrading, or purchasing an investment property, we find the right home loan from our panel of 40+ lenders to match your goals and budget.',
    icon: 'home',
    theme: 'navy',
    tags: ['First Home Buyers', 'Owner-Occupiers', 'Upgrades', 'Relocation'],
    order: 1,
  },
  {
    _id: '2',
    title: 'Investment Loans',
    description:
      'Build wealth through strategic property investment. We structure your loans to maximise borrowing capacity and optimise your portfolio for long-term growth.',
    icon: 'trending_up',
    theme: 'white',
    order: 2,
  },
  {
    _id: '3',
    title: 'Refinancing',
    description:
      'Save thousands by moving to a better rate. We compare your current loan against hundreds of options and handle the entire refinancing process for you.',
    icon: 'refresh',
    theme: 'white',
    order: 3,
  },
  {
    _id: '4',
    title: 'Self-Employed Solutions',
    description:
      'Running your own business shouldn\'t limit your borrowing options. We specialise in complex income structures and know exactly which lenders will work for you — from sole traders to company directors.',
    icon: 'business_center',
    theme: 'gold',
    order: 4,
  },
  {
    _id: '5',
    title: 'Construction Loans',
    description:
      'Building your dream home? We manage the progressive drawdown process and keep your finances on track from slab to completion.',
    icon: 'construction',
    theme: 'white',
    order: 5,
  },
  {
    _id: '6',
    title: 'SMSF Loans',
    description:
      'Invest in property through your self-managed super fund with confidence. We navigate the complex SMSF lending landscape to grow your retirement wealth.',
    icon: 'account_balance',
    theme: 'navy',
    order: 6,
  },
  {
    _id: '7',
    title: 'Debt Consolidation',
    description:
      'Simplify your finances by rolling multiple debts into one manageable repayment. We help you take control and reduce the total interest you pay.',
    icon: 'payments',
    theme: 'white',
    order: 7,
  },
];

function getThemeStyles(theme) {
  switch (theme) {
    case 'gold':
      return { background: '#F5C200', color: '#0D1B2A', iconColor: '#0D1B2A', tagBg: 'rgba(13,27,42,0.12)', tagColor: '#0D1B2A' };
    case 'navy':
      return { background: '#0D1B2A', color: 'white', iconColor: '#F5C200', tagBg: 'rgba(245,194,0,0.15)', tagColor: '#F5C200' };
    default:
      return { background: 'white', color: '#0D1B2A', iconColor: '#0D1B2A', tagBg: '#FAF6EE', tagColor: '#0D1B2A' };
  }
}

function ServiceCard({ service, wide }) {
  const theme = getThemeStyles(service.theme);

  return (
    <div
      className={`rounded-2xl overflow-hidden card-hover flex flex-col ${wide ? 'lg:col-span-2' : ''}`}
      style={{ background: theme.background }}
    >
      {/* Image if available */}
      {service.image?.asset?.url && (
        <div className="relative h-48 overflow-hidden">
          <Image src={service.image.asset.url} alt={service.title} fill className="object-cover" />
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Icon */}
        {!service.image?.asset?.url && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{
              background:
                service.theme === 'gold'
                  ? 'rgba(13,27,42,0.12)'
                  : service.theme === 'navy'
                  ? 'rgba(245,194,0,0.15)'
                  : '#FAF6EE',
            }}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ color: theme.iconColor }}
            >
              {service.icon || 'home'}
            </span>
          </div>
        )}

        <h3
          className="font-headline font-bold text-xl mb-3"
          style={{ color: theme.color }}
        >
          {service.title}
        </h3>

        <p
          className="font-body text-sm leading-relaxed flex-1"
          style={{ color: service.theme === 'navy' ? 'rgba(255,255,255,0.7)' : service.theme === 'gold' ? 'rgba(13,27,42,0.75)' : '#5A5A6A' }}
        >
          {service.description}
        </p>

        {/* Tags */}
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {service.tags.map(tag => (
              <span
                key={tag}
                className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: theme.tagBg, color: theme.tagColor }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServicesSection({ services }) {
  const items = services && services.length > 0 ? services : defaultServices;

  // Layout: first card wide, then pairs, last card wide-ish
  const layouts = [true, false, false, true, false, false, false];

  return (
    <section id="services" style={{ background: '#F0EAD8' }}>
      <div className="container-xl section-padding">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">What We Offer</span>
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl leading-tight" style={{ color: '#0D1B2A' }}>
            Our Services
          </h2>
          <p className="font-body text-lg mt-4 max-w-xl mx-auto" style={{ color: '#5A5A6A' }}>
            From your first home to your fifth investment property, we have a solution tailored to you.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((service, idx) => (
            <ServiceCard key={service._id} service={service} wide={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
