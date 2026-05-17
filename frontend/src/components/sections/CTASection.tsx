import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { useInView } from '../hooks/useInView'

export default function CTASection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-20 lg:py-28 bg-white" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-4xl mx-auto section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-12 lg:p-16 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 rounded-full mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-xs font-medium">Currently accepting new clients</span>
            </div>

            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Automate Your Business?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
              Book a free 30-minute demo call. We'll show you exactly how automation will work for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-brand-700 font-semibold rounded-2xl hover:bg-blue-50 transition-all shadow-lg"
              >
                Book Free Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+918115067311"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </a>
            </div>

            <p className="text-blue-200/70 text-xs mt-6">No credit card required • Setup in 48 hours • Cancel anytime</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
