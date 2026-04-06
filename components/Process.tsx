const steps = [
  { num: '01', icon: 'chat',          title: 'Free Consultation',      desc: 'We listen to your full story, understand your goals, and honestly assess your situation — no cost, no obligation, no jargon.' },
  { num: '02', icon: 'manage_search', title: 'Strategy & Research',    desc: 'We research 40+ lenders to find the right fit for your unique circumstances — the best solution for you, not the path of least resistance.' },
  { num: '03', icon: 'description',   title: 'Application & Advocacy', desc: 'We handle the paperwork, negotiate directly with lenders, and advocate on your behalf — removing every hurdle from your path.' },
  { num: '04', icon: 'celebration',   title: 'Settlement & Beyond',    desc: 'We celebrate with you at settlement — then remain your trusted partner for every financial decision that comes next.', gold: true },
]

export default function Process() {
  return (
    <section id="process" className="py-28 bg-navy">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-gold font-bold text-sm uppercase tracking-widest mb-4">Simple Steps</p>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-4">How It Works</h2>
          <p className="text-lg text-white/55 leading-relaxed">A complex process made straightforward.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map(s => (
            <div key={s.num} className={`${s.gold ? 'bg-gold' : 'bg-white/5 border border-white/10'} rounded-xl p-8 text-center`}>
              <div className={`w-14 h-14 ${s.gold ? 'bg-navy/20' : 'bg-gold'} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                <span className={`material-symbols-outlined ${s.gold ? 'text-navy' : 'text-navy'}`}>{s.icon}</span>
              </div>
              <p className={`${s.gold ? 'text-navy' : 'text-gold'} font-bold text-xs mb-3 uppercase tracking-widest`}>Step {s.num}</p>
              <h3 className={`font-headline font-bold text-lg ${s.gold ? 'text-navy' : 'text-white'} mb-3`}>{s.title}</h3>
              <p className={`${s.gold ? 'text-navy/70' : 'text-white/50'} text-sm leading-relaxed`}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
