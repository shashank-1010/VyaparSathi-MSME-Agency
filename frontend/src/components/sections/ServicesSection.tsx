import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageSquare, Globe, Bot, Boxes, ArrowRight, Megaphone, HeadphonesIcon, Zap } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const services = [
  { icon: MessageSquare, title: 'WhatsApp Automation', desc: 'Auto-replies, booking, catalog sharing, payment reminders & daily reports for your business.', gradient: 'from-emerald-400 to-teal-500' },
  { icon: Bot, title: 'AI Agents for MSMEs', desc: 'Custom AI agents that handle inquiries, manage leads, and run repetitive tasks 24/7.', gradient: 'from-blue-400 to-indigo-600' },
  { icon: Globe, title: 'Website Development', desc: 'Fast, mobile-first business websites with WhatsApp integration, SEO & admin panels.', gradient: 'from-violet-400 to-purple-600' },
  { icon: HeadphonesIcon, title: 'AI Customer Support', desc: 'Never miss a customer query. AI-powered support bots available round the clock.', gradient: 'from-orange-400 to-rose-500' },
  { icon: Boxes, title: 'Inventory & Udhar', desc: 'Track stock, manage credit (udhar) records, and get daily automated reports.', gradient: 'from-teal-400 to-cyan-500' },
  { icon: Megaphone, title: 'Digital Branding', desc: 'Google Business setup, social media branding, and a complete digital identity kit.', gradient: 'from-pink-400 to-fuchsia-600' },
]

export default function ServicesSection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-20 lg:py-28 bg-white" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-5">
            <Zap className="w-3.5 h-3.5 text-blue-500" fill="currentColor" />
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">What We Offer</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif" }}>
            Services Built for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Indian Businesses
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            End-to-end automation solutions tailored for MSMEs, retail shops, service businesses and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl border border-slate-100 p-6 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top right, rgba(219,234,254,0.3) 0%, transparent 60%)' }} />
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif" }}>
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-lg"
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}