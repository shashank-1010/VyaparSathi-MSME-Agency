import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const steps = [
  { num: '01', title: 'Free Consultation', desc: "Tell us about your business and we'll suggest the best automation plan — no cost, no obligation.", color: 'from-blue-400 to-indigo-500' },
  { num: '02', title: 'Custom Strategy', desc: 'Our team designs a tailored automation blueprint specific to your industry and workflows.', color: 'from-violet-400 to-purple-600' },
  { num: '03', title: 'Build & Integrate', desc: 'We build and connect all systems — WhatsApp bot, AI agents, website, and more — in 48–72 hours.', color: 'from-emerald-400 to-teal-500' },
  { num: '04', title: 'Train & Launch', desc: 'We train your team and launch. Your business starts running smarter from day one.', color: 'from-orange-400 to-rose-500' },
  { num: '05', title: 'Ongoing Support', desc: 'We monitor, maintain, and improve your systems. Monthly reports, WhatsApp support, free updates.', color: 'from-blue-400 to-cyan-500' },
]

export default function ProcessSection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-20 lg:py-28 bg-white" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif" }}>
            How We{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">A simple, transparent process from first call to full automation.</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-blue-200 via-violet-200 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6 items-start"
              >
                {/* Step dot */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0 shadow-lg`}>
                  <span className="text-white font-bold text-sm" style={{ fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif" }}>{step.num}</span>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 flex-1 hover:shadow-lg hover:shadow-slate-200/60 hover:border-slate-200 transition-all duration-300">
                  <h3 className="font-bold text-xl text-slate-900 mb-2 tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}