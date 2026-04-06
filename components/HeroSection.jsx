import Image from 'next/image';

export default function HeroSection({ settings }) {
  const heroImage = settings?.heroImage?.asset?.url;
  const heading = settings?.heroHeading || 'Your Home Loan Partner, Every Step of the Way.';
  const tagline = settings?.tagline || "Australia's Trusted Mortgage Partner";
  const subheading =
    settings?.heroSubheading ||
    'Tailored mortgage solutions for your unique situation. We advocate for you every step of the way — from first consultation to settlement and beyond.';

  // Split heading to highlight "Every Step"
  const highlight = 'Every Step';
  const headingParts = heading.split(highlight);

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: '92vh', background: '#0D1B2A' }}
    >
      {/* Background image */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Hero background"
            fill
            className="object-cover"
            style={{ opacity: 0.35, filter: 'grayscale(100%)' }}
            priority
          />
        </div>
      )}

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.6) 100%)' }}
      />

      {/* Content */}
      <div className="container-xl relative z-10 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="section-label section-label-light mb-6">{tagline}</p>

          {/* Main heading */}
          <h1 className="font-headline font-extrabold text-white leading-tight mb-6 text-5xl md:text-7xl lg:text-8xl">
            {headingParts.length > 1 ? (
              <>
                {headingParts[0]}
                <span style={{ color: '#F5C200' }}>{highlight}</span>
                {headingParts[1]}
              </>
            ) : (
              heading
            )}
          </h1>

          {/* Subheading */}
          <p className="font-body text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            {subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-gold text-base">
              Begin Your Journey
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </a>
            <a href="#services" className="btn-outline-white text-base">
              Our Services
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #0D1B2A)' }}
      />
    </section>
  );
}
