import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const testimonials = [
  {
    name: 'Rajesh Gupta',
    business: 'Gupta Electronics, Lucknow',
    text: "NexBot's WhatsApp automation changed everything. My shop gets 3x more inquiries and I don't miss a single customer now. The udhar tracking alone saves me 2 hours daily.",
    rating: 5,
    initials: 'RG',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'Priya Sharma',
    business: "Priya's Boutique, Lucknow",
    text: 'The AI customer support bot handles all my Instagram and WhatsApp queries at night. My customers love the instant replies. Sales went up 40% in 2 months!',
    rating: 5,
    initials: 'PS',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    name: 'Mohammed Rizwan',
    business: 'Rizwan Traders, Agra',
    text: 'Affordable, quick setup, and the team speaks Hindi! They set up my entire inventory system + WhatsApp bot in 3 days. Best investment for my business.',
    rating: 5,
    initials: 'MR',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Sunita Verma',
    business: 'Verma Clinic, Varanasi',
    text: 'Our appointment booking now runs on autopilot. No more phone calls for scheduling. Patients get WhatsApp confirmations automatically. Highly recommended!',
    rating: 5,
    initials: 'SV',
    gradient: 'from-violet-400 to-purple-600',
  },
]

export default function TestimonialsSection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-20 lg:py-28 bg-slate-50" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif" }}>
            What Our Clients{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-slate-500 text-lg">Real stories from real Indian businesses.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 p-7 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center font-bold text-sm text-white shadow-md`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{t.business}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}