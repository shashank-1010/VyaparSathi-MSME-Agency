import { motion } from 'framer-motion'
import { Shield, Clock, IndianRupee, Headphones, Zap, Users } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const reasons = [
  { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security with 99.9% uptime SLA for all automation systems.', gradient: 'from-blue-400 to-indigo-500' },
  { icon: Clock, title: '24/7 Availability', desc: 'Your AI agent never sleeps. Serve customers at 3am without any extra cost.', gradient: 'from-emerald-400 to-teal-500' },
  { icon: IndianRupee, title: 'Affordable Plans', desc: 'Priced for Indian MSMEs. Start from ₹999/month with no hidden charges.', gradient: 'from-orange-400 to-amber-500' },
  { icon: Headphones, title: 'Dedicated Support', desc: 'WhatsApp-first support team available in Hindi and English.', gradient: 'from-violet-400 to-purple-600' },
  { icon: Zap, title: 'Quick Setup', desc: 'Get your automation live within 48–72 hours, not weeks.', gradient: 'from-yellow-400 to-orange-500' },
  { icon: Users, title: 'India-Focused', desc: 'Built specifically for Indian businesses — UPI, GST, local language support.', gradient: 'from-teal-400 to-cyan-500' },
]

export default function WhyUsSection() {
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
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">VyaparSathi</span>?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            We understand the unique challenges of Indian businesses and build solutions that actually work for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center shrink-0 shadow-md`}>
                <r.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1" style={{ fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif" }}>{r.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}